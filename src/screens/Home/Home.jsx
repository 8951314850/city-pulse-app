import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchEvents } from '../../api/eventsApi';
import EventCard from '../../components/EventCard';
import "./Home.css";

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      console.log("API Key from env:", process.env.REACT_APP_TICKETMASTER_KEY);
    }, []);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await searchEvents({ keyword, city });
      setEvents(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Find Events</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Keyword (e.g. music)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <input
          type="text"
          placeholder="City (e.g. Dubai)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="event-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => navigate(`/event/${event.id}`)}
          />
        ))}
      </div>

      {!loading && events.length === 0 && (
        <p>No events yet. Try searching above 👆</p>
      )}
    </div>
  );
}
