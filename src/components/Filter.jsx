import React, { useState, useEffect } from 'react';
import FilterResult from './FilterResult';

const Filter = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState({
    date: true,
    location: true,
    category: true
  });

  const [selectedFilters, setSelectedFilters] = useState({
    date: '',
    location: '',
    category: ''
  });

  const [events, setEvents] = useState([]);
  const [showFilterResults, setShowFilterResults] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  // Fetch all events initially
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_EVENT_APP_SERVER_URL}/api/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Fetch filtered events whenever filters change
  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedFilters.date) params.append('date', selectedFilters.date);
        if (selectedFilters.location) params.append('location', selectedFilters.location);
        if (selectedFilters.category) params.append('category', selectedFilters.category);

        const response = await fetch(`${import.meta.env.VITE_EVENT_APP_SERVER_URL}/api/events?${params}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching filtered events:', error);
      }
    };

    if (selectedFilters.date || selectedFilters.location || selectedFilters.category) {
      fetchFilteredEvents();
    }
  }, [selectedFilters]);

  if (showFilterResults) {
    return (
      <FilterResult 
        events={filteredEvents}
        onBack={() => {
          setShowFilterResults(false);
          setFilteredEvents([]);
        }}
      />
    );
  }

  if (!isOpen) return null;

  const toggleSection = (section) => {
    setOpenSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterSelect = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value // Toggle selection
    }));
  };

  const handleEvents = () => {
    console.log("events:", events);
    onClose();
    setShowFilterResults(true);
    setFilteredEvents(events);
  };

  return (
    <div className="fixed max-w-md mx-auto inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute bottom-0 top-0 left-0 right-0 bg-gray-900 rounded-t-3xl p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <svg
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
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
            placeholder="Search events"
            className="w-full bg-gray-800 rounded-xl pl-12 pr-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Date Section */}
        <div>
          <button 
            onClick={() => toggleSection('date')}
            className="w-full flex justify-between items-center mb-4"
          >
            <h3 className="text-white text-lg font-semibold">Date</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-5 h-5 text-gray-400 transition-transform ${openSection.date ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {openSection.date && (
            <div className="flex gap-3">
              {['Today', 'Tomorrow', 'This Weekend'].map(date => (
                <button
                  key={date}
                  onClick={() => handleFilterSelect('date', date)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedFilters.date === date
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Section */}
        <div>
          <button 
            onClick={() => toggleSection('location')}
            className="w-full flex justify-between items-center mb-4"
          >
            <h3 className="text-white text-lg font-semibold">Location</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-5 h-5 text-gray-400 transition-transform ${openSection.location ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {openSection.location && (
            <div className="flex gap-3">
              {['Auckland', 'Wellington', 'Christchurch'].map(location => (
                <button
                  key={location}
                  onClick={() => handleFilterSelect('location', location)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedFilters.location === location
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Section */}
        <div>
          <button 
            onClick={() => toggleSection('category')}
            className="w-full flex justify-between items-center mb-4"
          >
            <h3 className="text-white text-lg font-semibold">Category</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-5 h-5 text-gray-400 transition-transform ${openSection.category ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {openSection.category && (
            <div className="grid grid-cols-2 gap-3">
              {['Music', 'Sports', 'Arts', 'Food & Drink', 'Comedy', 'Theatre'].map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterSelect('category', category)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedFilters.category === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Show Events Button */}
        <button
          onClick={handleEvents}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold mt-6"
        >
          Show {events.length} Events
        </button>

        {/* Close Button */}
        <div className="flex justify-center">
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6 text-gray-900"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter; 