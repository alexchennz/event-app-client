import React, { useState, useEffect } from "react";
import SearchResultEvent from "./SearchResultEvent";

const SavedEvent = ({ onEventSelect }) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        // Get saved event IDs from localStorage
        const savedEventIds = JSON.parse(localStorage.getItem('savedEvents') || '[]');
        
        if (savedEventIds.length === 0) {
          setSavedEvents([]);
          setLoading(false);
          return;
        }

        // Fetch full event details for saved events
        const response = await fetch(`${import.meta.env.VITE_EVENT_APP_SERVER_URL}/api/events?ids=${savedEventIds.join(',')}`);
        const data = await response.json();
        setSavedEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved events:', error);
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Saved Events</h1>
        
        {savedEvents.length === 0 ? (
          <div className="text-gray-400 text-center mt-8">
            <p>No saved events yet.</p>
            <p className="mt-2">Events you save will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedEvents.map((event) => (
              <SearchResultEvent
                key={event._id}
                event={event}
                onClick={() => onEventSelect(event)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedEvent; 