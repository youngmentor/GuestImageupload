import { useState } from 'react';
import { useMutation } from 'react-query';
import { sendInviteLink } from '../api/mutation';



const SendLinkToGuests  = () => {
    const guestLink = ''
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState<string[]>([]);

    const { mutate, isLoading, isSuccess, isError } = useMutation(sendInviteLink, {
        onSuccess: () => {
            alert('Guest link sent successfully!');
            setEmails([]); // Clear the email list
        },
        onError: () => {
            alert('Failed to send the guest link. Please try again.');
        },
    });

    const handleAddEmail = () => {
        if (email && validateEmail(email) && !emails.includes(email)) {
            setEmails([...emails, email]);
            setEmail('');
        } else {
            alert("Please enter a valid, unique email address.");
        }
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setEmails(emails.filter(e => e !== emailToRemove));
    };

    const handleSendEmails = () => {
        if (emails.length === 0) {
            alert("Please add at least one email address.");
            return;
        }
        
        mutate({ emails, guestLink });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="w-[100%] flex flex-col items-center">
            <div className="w-full md:w-1/2 mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter guest email"
                    className="p-2 border rounded w-full mb-2"
                />
                <button 
                    onClick={handleAddEmail} 
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Email
                </button>
            </div>

            <ul className="w-full md:w-1/2 mb-4">
                {emails.map((email, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-100 mb-1 rounded">
                        <span>{email}</span>
                        <button 
                            onClick={() => handleRemoveEmail(email)} 
                            className="text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <button 
                onClick={handleSendEmails} 
                className={`w-full md:w-1/2 p-2 text-white rounded ${isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                disabled={isLoading}
            >
                {isLoading ? "Sending..." : "Send Link to All Guests"}
            </button>

            {isSuccess && <p className="text-green-500 mt-2">Invitations sent successfully!</p>}
            {isError && <p className="text-red-500 mt-2">Error sending invitations. Please try again.</p>}
        </div>
    );
};

export default SendLinkToGuests;
