import React, { useState, useEffect } from 'react';
import { LocationIcon } from './icons';

const EventDetail = ({ event, onBack }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if event is saved on component mount
    const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
    setIsSaved(savedEvents.includes(event._id));
  }, [event._id]);

  const handleSaveToggle = () => {
    const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
    
    if (isSaved) {
      // Remove event from saved events
      const updatedSavedEvents = savedEvents.filter(id => id !== event._id);
      localStorage.setItem('savedEvents', JSON.stringify(updatedSavedEvents));
      setIsSaved(false);
    } else {
      // Add event to saved events
      savedEvents.push(event._id);
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
      setIsSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
        <div className="max-w-md mx-auto px-4 pb-20">
      {/* Header */}
      <div className="relative h-72">
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/30 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleSaveToggle}
            className="p-2 rounded-full bg-gray-900/50 hover:bg-gray-900/75"
          >
            {isSaved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-purple-500"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
          </button>
          <button className="p-2 rounded-full bg-black/30 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </div>
        <img 
          src={`${import.meta.env.VITE_EVENT_APP_SERVER_URL}${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900"></div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-20 relative">
        <div className="inline-block px-4 py-1 bg-purple-600 rounded-full text-sm text-white mb-4">
          {event.category}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
        <div className="flex items-center text-gray-300 mb-6">
          <LocationIcon />
          <span>{event.location.venue}, {event.location.city}</span>
        </div>

        {/* Date & Time */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Date & Time</div>
              <div className="text-white">
                {new Date(event.date).toLocaleDateString('en-NZ', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="text-white">2:00 PM</div>
            </div>
            <button className="text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">About Event</h2>
          <p className="text-gray-300">
            {event.description}
          </p>
        </div>

        {/* Tickets */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800">
          <div className="max-w-md mx-auto">
            <div className="w-full mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400">From</div>
                  <div className="text-xl font-bold text-white">${event.price.from.toFixed(2)} NZD</div>
                </div>
                <div>
                  <div className="text-gray-400">Available</div>
                  <div className="text-sm text-purple-600">{event.ticketsRemaining.toLocaleString()} remaining</div>
                </div>
              </div>
            </div>
            <div className="w-full mt-4">
              <a
                href={event.ticketUrl}
                rel="noopener noreferrer" 
                className="block w-full bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-center"
              >
                Get Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EventDetail; 