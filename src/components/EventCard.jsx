// src/components/EventCard.jsx
import { Link } from "react-router-dom";
import "./EventCard.css"; // we'll add some CSS

function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0];

  return (
    <div className="event-card">
      <Link to={`/event/${event.id}`} className="event-link">
        {event.images?.[0] && (
          <img
            src={event.images[0].url}
            alt={event.name}
            className="event-image"
          />
        )}
        <div className="event-info">
          <h3>{event.name}</h3>
          <p>{event.dates?.start?.localDate}</p>
          {venue && <p>{venue.name}</p>}
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
