import React, { useState } from 'react';

const GuestUpload: React.FC = () => {
    const [files, setFiles] = useState<FileList | null>(null);

    const handleUpload = async () => {
        if (!files) return;
        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('images', file));
        // Make the API call to upload images
        await fetch('/api/upload', { method: 'POST', body: formData });
    };

    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col p-6 bg-white">
            <div className='w-[40%] h-[300px]'>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="block w-full"
                />
                <button onClick={handleUpload} className="mt-2 p-2 bg-blue-500 text-white rounded">
                    Upload Images
                </button>
            </div>
        </div>
    );
};

export default GuestUpload;
