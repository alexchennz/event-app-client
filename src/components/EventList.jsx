import React from 'react';
import { LocationIcon } from './icons';

const EventList = ({ events }) => {
  const event = events[0]; // Since we're now passing single events

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex">
      <div className="flex-shrink-0 w-16 text-center bg-gray-700 rounded-lg p-2">
        <div className="text-gray-400 text-sm">
          {new Date(event.date).toLocaleDateString('en-NZ', {
            month: 'short',
          }).toUpperCase()}
        </div>
        <div className="text-white text-xl font-bold">
          {new Date(event.date).getDate()}
        </div>
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-white font-semibold">{event.title}</h3>
        <div className="text-gray-400 text-sm">
          <LocationIcon /> {event.location.venue}, {event.location.city}
        </div>
        <div className="text-purple-400 text-sm">
          From ${event.price.from}
        </div>
      </div>
    </div>
  );
};

export default EventList; 