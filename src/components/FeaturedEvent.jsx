import React from 'react';
import { LocationIcon } from './icons';

const FeaturedEvent = ({ event }) => {
  return (
    <div className="relative rounded-xl overflow-hidden h-48 mb-6 cursor-pointer">
      <div className="relative w-full h-full">
        <img
          src={`http://localhost:5000${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="text-purple-400 text-sm mb-1">
          {new Date(event.date).toLocaleDateString('en-NZ', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <h2 className="text-white text-xl font-semibold">{event.title}</h2>
        <div className="text-gray-300 text-sm">
          <LocationIcon />
          {event.location.venue}, {event.location.city}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent; 