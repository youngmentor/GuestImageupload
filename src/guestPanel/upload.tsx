import React, { useCallback, useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { uploadPictures } from '../api/mutation';

const GuestUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

    const openCamera = async () => {
        setShowCamera(true);
        if (navigator.mediaDevices?.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } else {
            alert("Camera not supported on this device.");
        }
    };

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                canvasRef.current.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
                        setSelectedFiles((prev) => [...prev, file]);
                    }
                }, 'image/jpeg');
            }
        }
    };

    const closeCamera = () => {
        setShowCamera(false);
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
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
        <div className="w-full flex items-center justify-center gap-5 flex-col p-6 bg-white overflow-scroll">
            <div
                {...getRootProps()}
                className="w-[30%] h-[200px] max-[650px]:h-[100px] border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer max-[650px]:w-full"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Drop the images here ...</p>
                ) : (
                    <p className="text-gray-500 text-[12px]">Drag and drop images here, or click to select files</p>
                )}
            </div>
            
            <button
                className="w-[30%] h-[40px] bg-green-500 text-white rounded mb-4 max-[650px]:w-full"
                onClick={openCamera}
            >
                Open Camera
            </button>

            {showCamera && (
                <div className="flex flex-col items-center">
                    <video ref={videoRef} className="w-[100%] h-[300px] bg-black" autoPlay />
                    <canvas ref={canvasRef} width="300" height="200" className="hidden" />
                    <button onClick={capturePhoto} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
                        Capture Photo
                    </button>
                    <button onClick={closeCamera} className="mt-2 text-red-500">
                        Close Camera
                    </button>
                </div>
            )}

            {mutation.isLoading && <p className="text-blue-500 mt-2">Uploading images...</p>}

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
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="w-[30%] max-[650px]:w-full">
                <button
                    className="w-full h-[40px] bg-blue-500 text-white rounded"
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
