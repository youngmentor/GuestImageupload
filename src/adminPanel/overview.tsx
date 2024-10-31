import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const AdminDashboard: React.FC = () => {
    const guestLink = "https://yourapp.com/upload";
    const qrRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Generate QR code when the component mounts
        QRCode.toCanvas(qrRef.current as HTMLCanvasElement, guestLink, { errorCorrectionLevel: 'H' }, (error) => {
            if (error) console.error(error);
        });
    }, [guestLink]);

    const handleDownload = () => {
        if (qrRef.current) {
            const canvas = qrRef.current;
            const pngUrl = canvas.toDataURL("image/png");

            // Create a link element
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'guest_upload_qrcode.png'; // Name for the downloaded file
            document.body.appendChild(link); // Append link to body
            link.click(); // Trigger the download
            document.body.removeChild(link); // Remove link from body
        } else {
            console.error("Canvas not found");
            alert("Error: QR Code not rendered yet. Please try again.");
        }
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <canvas ref={qrRef} />
            <p className="mt-2">Share this QR code with guests or download it for printing.</p>
            <button 
                onClick={handleDownload} 
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Download QR Code
            </button>
        </div>
    );
};

export default AdminDashboard;
