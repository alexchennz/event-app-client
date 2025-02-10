import React, { useState, useEffect, useRef } from 'react';
import Filter from './Filter';
import SearchResultEvent from './SearchResultEvent';

const SearchBar = ({ onEventSelect }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchResults([]);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchEvents = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_EVENT_APP_SERVER_URL}/api/events?search=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchEvents, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleEventClick = (event) => {
    onEventSelect(event);
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <>
      <div ref={searchContainerRef} className="relative w-full mb-6">
        <div className="flex items-center bg-gray-800/50 backdrop-blur-xl rounded-xl">
          <div className="flex-1 flex items-center">
            <svg
              className="absolute left-4 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events"
              className="w-full bg-transparent pl-12 pr-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button 
            className="p-3 text-gray-400"
            onClick={() => setIsFilterOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </button>
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.length >= 2 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-gray-900 shadow-xl overflow-hidden z-50">
            {isLoading ? (
              <div className="p-4 text-center text-gray-400">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-[600px] overflow-y-auto">
                {searchResults.map((event) => (
                  <SearchResultEvent 
                    key={event._id} 
                    event={event}
                    onClick={() => handleEventClick(event)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                No events found
              </div>
            )}
          </div>
        )}
      </div>
      <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </>
  );
};

export default SearchBar; 