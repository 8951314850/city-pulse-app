import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../api/eventsApi";
import { isFavourite, addFavourite, removeFavourite } from "../../utils/favourites";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // make sure Leaflet CSS is imported

import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data);
        setFavourite(isFavourite(data.id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  const toggleFavourite = () => {
    if (!event) return;
    if (favourite) {
      removeFavourite(event.id);
      setFavourite(false);
    } else {
      addFavourite({
        id: event.id,
        name: event.name,
        date: event.dates?.start?.localDate,
        venue: event._embedded?.venues?.[0]?.name,
        image: event.images?.[0]?.url,
      });
      setFavourite(true);
    }
  };

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>No event found.</p>;

  const venue = event._embedded?.venues?.[0];

  return (
    <div className="event-details">
      {event.images?.[0] && (
        <div className="event-banner">
          <img src={event.images[0].url} alt={event.name} />
        </div>
      )}

      <div className="event-content">
        <h2>{event.name}</h2>
        <p className="event-date">
          {event.dates?.start?.localDate} {event.dates?.start?.localTime}
        </p>

        {venue && (
          <p className="event-venue">
            📍 {venue.name}, {venue.city?.name}, {venue.country?.name}
          </p>
        )}

        {event.info && <p className="event-info">{event.info}</p>}

        {/* Favourite & Ticket Buttons */}
        <div className="event-actions">
          <button onClick={toggleFavourite} className="fav-btn">
            {favourite ? "⭐ Remove from Favourites" : "☆ Add to Favourites"}
          </button>

          {event.url && (
            <a
              className="event-btn"
              href={event.url}
              target="_blank"
              rel="noreferrer"
            >
              🎟 Buy Tickets
            </a>
          )}
        </div>

        {/* Map Preview using Leaflet */}
        {venue?.location?.latitude && venue?.location?.longitude && (
          <div style={{ height: "250px", marginTop: "15px" }}>
            <MapContainer
              center={[venue.location.latitude, venue.location.longitude]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[venue.location.latitude, venue.location.longitude]}>
                <Popup>{venue.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

      </div>
    </div>
  );
}

export default EventDetails;
