import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { createEvent } from '../services/api';

function AddEventPage() {
  const navigate = useNavigate();

  const handleSubmit = async (eventData) => {
    try {
      await createEvent(eventData);
      alert('Event created successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to create event. Please try again.');
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="page-container">
      <h1>Create New Event</h1>
      <EventForm onSubmit={handleSubmit} buttonText="Create Event" />
    </div>
  );
}

export default AddEventPage;