import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { uploadPictures } from '../api/mutation';

const GuestUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const mutation = useMutation(uploadPictures);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
    }, []);

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('media', file));

        mutation.mutate(formData, {
            onSuccess: (data) => {
                console.log('Upload successful:', data);
                alert('Images uploaded successfully');
                setSelectedFiles([]); // Clear selected files after successful upload
            },
            onError: (error) => {
                console.error('Upload failed:', error);
                alert('Failed to upload images');
            },
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'video/*': [],
        },
        multiple: true,
    });

    return (
        <div className="w-full  flex items-center justify-center gap-5 flex-col p-6 bg-white overflow-scroll">
            <div
                {...getRootProps()}
                className="w-[30%] h-[200px] max-[650px]:h-[100px] border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer  max-[650px]:w-full"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Drop the images here ...</p>
                ) : (
                    <p className="text-gray-500 text-[12px]">Drag and drop images here, or click to select files</p>
                )}
            </div>
            {mutation.isLoading && (
                <p className="text-blue-500 mt-2">Uploading images...</p>
            )}

            {selectedFiles.length > 0 && (
                <div className="flex flex-col items-center w-[100%] ">
                    <h3 className="mb-2 max-[650px]:w-[100%]">Selected Files:</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="flex flex-col items-center">
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-32 h-32 object-cover max-[650px]:w-22 max-[650px]:h-25"
                                    />
                                ) : (
                                    <video
                                        src={URL.createObjectURL(file)}
                                        className="w-32 h-32 object-cover max-[650px]:w-16 max-[650px]:h-16"
                                        controls
                                    />
                                )}
                                {/* <p className="mt-1 text-center">{file.name}</p> */}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className='w-[30%] max-[650px]:w-full'>
                <button
                    className='w-full h-[40px] bg-blue-500 text-white rounded '
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || mutation.isLoading}
                >
                    Upload Images
                </button>
            </div>
        </div>
    );
};

export default GuestUpload;
