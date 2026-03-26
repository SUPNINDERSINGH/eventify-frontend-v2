import { Link } from 'react-router-dom';

function EventCard({ event, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-card">
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p className="event-date">📅 {formatDate(event.date)}</p>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-description">
          {event.description?.substring(0, 100)}
          {event.description?.length > 100 ? '...' : ''}
        </p>
        <div className="event-actions">
          <Link to={`/events/${event.id}`} className="btn-view">View</Link>
          <Link to={`/events/${event.id}/edit`} className="btn-edit">Edit</Link>
          <button onClick={() => onDelete(event.id)} className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;