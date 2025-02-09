import React, { useState, useEffect } from 'react';
import SearchResultEvent from './SearchResultEvent';
import Filter from './Filter';

const Explore = ({ onEventSelect }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-md mx-auto px-4">
          <div className="py-4">
            <h1 className="text-2xl font-bold mb-4">Explore Events</h1>
            <div className="text-center py-8 text-gray-400">Loading events...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto px-4 pb-20">
        <div className="py-4">
          <h1 className="text-2xl font-bold mb-4">Explore Events</h1>
          <div className="space-y-4">
            {events.map((event) => (
              <SearchResultEvent 
                key={event._id} 
                event={event}
                onClick={() => onEventSelect(event)}
              />
            ))}
          </div>
        </div>
      </div>
      {showFilter && (
        <Filter
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
};

export default Explore; 