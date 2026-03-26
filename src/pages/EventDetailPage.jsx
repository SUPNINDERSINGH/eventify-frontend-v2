import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEvent, deleteEvent } from '../services/api';

function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await getEvent(id);
      setEvent(response.data);
    } catch (error) {
      alert('Event not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        alert('Event deleted successfully!');
        navigate('/');
      } catch (error) {
        alert('Failed to delete event.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!event) return <div className="error">Event not found</div>;

  return (
    <div className="detail-page">
      <div className="detail-container">
        <h1>{event.title}</h1>
        <p className="detail-date">📅 {formatDate(event.date)}</p>
        <p className="detail-location">📍 {event.location}</p>
        <div className="detail-description">
          <h3>About this event</h3>
          <p>{event.description}</p>
        </div>
        <div className="detail-actions">
          <Link to={`/events/${id}/edit`} className="btn-edit">Edit Event</Link>
          <button onClick={handleDelete} className="btn-delete">Delete Event</button>
          <Link to="/" className="btn-back">Back to Events</Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;