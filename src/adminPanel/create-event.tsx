import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { createEvent } from '../api/mutation';

const CreateEvent: React.FC = () => {
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    
    const mutation = useMutation(createEvent, {
        onSuccess: (data) => {
            console.log('Event created successfully:', data);
            alert('Event created successfully!');
            // Reset the form or redirect the user as needed
            setEventName('');
            setEventType('');
        },
        onError: (error) => {
            console.error('Error creating event:', error);
            alert('Failed to create event. Please try again.');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Ensure fields are filled
        if (!eventName || !eventType) {
            alert('Please fill in all fields');
            return;
        }

        const eventData = {
            name: eventName,
            type: eventType,
        };

        // Call the mutation
        mutation.mutate(eventData);
    };

    return (
        <div className="w-full flex items-center justify-center p-6 bg-white">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-100 p-8 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Create Event</h2>

                <div className="mb-4">
                    <label htmlFor="event-name" className="block text-gray-700">Event Name</label>
                    <input
                        type="text"
                        id="event-name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="event-type" className="block text-gray-700">Event Type</label>
                    <select
                        id="event-type"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select event type</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Corporate">Corporate</option>
                        {/* Add more event types as needed */}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full h-12 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Create Event
                </button>

                {mutation.isLoading && (
                    <p className="text-blue-500 mt-2">Creating event...</p>
                )}
            </form>
        </div>
    );
};

export default CreateEvent;
