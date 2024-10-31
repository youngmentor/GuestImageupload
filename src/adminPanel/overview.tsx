import React from 'react';
import QRCode from 'react-qr-code';

const AdminDashboard: React.FC = () => {
  const guestLink = "https://yourapp.com/upload";

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <QRCode value={guestLink} size={200} />
      <p>Share this QR code with guests or download it for printing.</p>
    </div>
  );
};

export default AdminDashboard;
