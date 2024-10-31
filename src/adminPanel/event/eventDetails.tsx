// EventDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const fetchEventMedia = async (eventId: string) => {
    const response = await fetch(`/api/events/${eventId}/media`); // Replace with actual endpoint
    if (!response.ok) {
        throw new Error('Failed to fetch event media');
    }
    return response.json();
};

const EventDetails: React.FC = () => {
    const { eventId } = useParams();
    const { data: media, isLoading, error } = useQuery(['eventMedia', eventId], () => fetchEventMedia(eventId!));

    if (isLoading) return <p>Loading media...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    // Separate images and videos
    const images = media.filter((item: { type: string }) => item.type === 'image');
    const videos = media.filter((item: { type: string }) => item.type === 'video');

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event Media</h1>

            {/* Images Section */}
            <h2 className="text-xl font-semibold mt-4 mb-2">Images</h2>
            {images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image: { id: string; url: string }) => (
                        <div key={image.id} className="border rounded overflow-hidden">
                            <img src={image.url} alt={`Event Image ${image.id}`} className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No images available for this event.</p>
            )}

            {/* Videos Section */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Videos</h2>
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos.map((video: { id: string; url: string }) => (
                        <div key={video.id} className="border rounded overflow-hidden">
                            <video controls src={video.url} className="w-full h-auto">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No videos available for this event.</p>
            )}
        </div>
    );
};

export default EventDetails;
