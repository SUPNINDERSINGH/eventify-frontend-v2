import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { getEvent, updateEvent } from '../services/api';

function EditEventPage() {
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

  const handleSubmit = async (eventData) => {
    try {
      await updateEvent(id, eventData);
      alert('Event updated successfully!');
      navigate(`/events/${id}`);
    } catch (error) {
      alert('Failed to update event. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1>Edit Event</h1>
      <EventForm 
        initialData={event} 
        onSubmit={handleSubmit} 
        buttonText="Update Event" 
      />
    </div>
  );
}

export default EditEventPage;