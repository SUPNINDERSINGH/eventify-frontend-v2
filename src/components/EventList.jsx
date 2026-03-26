import { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/api';
import EventCard from './EventCard';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events. Please try again later.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
      } catch (err) {
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="event-list">
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="no-events">No events found. Create your first event!</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;