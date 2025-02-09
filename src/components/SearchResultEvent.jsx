import React from 'react';

const SearchResultEvent = ({ event, onClick }) => {
  return (
    <div 
      className="flex flex-col hover:bg-gray-800 cursor-pointer rounded-lg overflow-hidden mb-4"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-48">
        <img 
          src={`http://localhost:5000${event.image}`} 
          alt={event.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        {/* Category Badge */}
        <span className="absolute top-2 right-2 text-sm text-white bg-purple-600 px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>

      {/* Event Details */}
      <div className="p-3 bg-gray-800 flex">
        {/* Left Column - Event Info */}
        <div className="flex-grow pr-4 space-y-1 w-[80%]">
          <h3 className="text-white font-semibold text-lg">{event.title}</h3>
          <p className="text-gray-400">{event.location.venue}</p>
          <div className="flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4 text-gray-400"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" 
              />
            </svg>
            <span className="text-gray-400">
              {new Date(event.date).toLocaleDateString('en-NZ', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Right Column - Price */}
        <div className="w-[20%] flex flex-col items-end justify-center">
          <div className="text-purple-400 font-semibold">
            ${event.price.from}
          </div>
          <div className="text-gray-400 text-sm">
            onwards
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultEvent; 