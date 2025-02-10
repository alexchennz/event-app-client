import React from 'react';
import SearchResultEvent from './SearchResultEvent';

const FilterResult = ({ events, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto px-4 pb-20">
        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Filter Results</h1>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <SearchResultEvent 
                key={event._id} 
                event={event}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterResult; 