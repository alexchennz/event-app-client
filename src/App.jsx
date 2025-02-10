import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FeaturedEvent from './components/FeaturedEvent';
import EventList from './components/EventList';
import BottomNav from './components/BottomNav';
import EventDetail from './components/EventDetail';
import Explore from './components/Explore';
import SavedEvent from './components/SavedEvent';

function App() {
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  console.log(`${import.meta.env.VITE_EVENT_APP_SERVER_URL}/api/events?featured=true`);
  useEffect(() => {
    // Only fetch events if we're on the home view
    if (currentView === 'home') {
      Promise.all([
        fetch(`${import.meta.env.VITE_EVENT_APP_SERVER_URL}/api/events?featured=true`),
        fetch(`${import.meta.env.VITE_EVENT_APP_SERVER_URL}/api/events?featured=false&limit=5`)
      ])
        .then(([featuredRes, eventsRes]) => Promise.all([featuredRes.json(), eventsRes.json()]))
        .then(([featuredData, eventsData]) => {
          setFeaturedEvents(featuredData);
          setEvents(eventsData);
        })
        .catch((error) => console.error('Error fetching events:', error));
    }
  }, [currentView]);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  if (currentView === 'explore') {
    return (
      <>
        <Explore onEventSelect={setSelectedEvent} />
        <BottomNav 
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      </>
    );
  }

  if (currentView === 'saved') {
    return (
      <>
        <SavedEvent onEventSelect={setSelectedEvent} />
        <BottomNav 
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto px-4 pb-20">
        <div className="py-4">
          <h1 className="text-2xl font-bold mb-4">NZ Events</h1>
          <SearchBar onEventSelect={setSelectedEvent} />
          {featuredEvents.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Featured Events</h2>
              <div className="space-y-6 mb-6">
                {featuredEvents.map((event) => (
                  <div key={event._id} onClick={() => setSelectedEvent(event)}>
                    <FeaturedEvent event={event} />
                  </div>
                ))}
              </div>
            </>
          )}
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event._id} onClick={() => setSelectedEvent(event)}>
                <EventList events={[event]} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav 
        currentView={currentView}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
