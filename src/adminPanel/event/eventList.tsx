// EventsList.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface Event {
    id: string;
    name: string;
    type: string;
}

const fetchEvents = async () => {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
};

const EventsList: React.FC = () => {
    const navigate = useNavigate();
    const { data: events, isLoading, error } = useQuery<Event[]>('events', fetchEvents);

    if (isLoading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Events</h1>
            <ul className="list-disc pl-5">
                {events?.map((event) => (
                    <li key={event.id} className="mb-2">
                        <button
                            onClick={() => navigate(`/events/${event.id}`)}
                            className="text-blue-500 hover:underline"
                        >
                            {event.name} ({event.type})
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;
