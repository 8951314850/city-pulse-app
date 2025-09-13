// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { getFavourites, removeFavourite } from "../../utils/favourites";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    setFavs(getFavourites());
  }, []);

  const handleRemove = (id) => {
    removeFavourite(id);
    setFavs(getFavourites());
  };

  return (
    <div className="profile">
      <h2>My Favourites ⭐</h2>

      {favs.length === 0 ? (
        <p>No favourites yet. Go add some from Event Details!</p>
      ) : (
        <div className="favs-grid">
          {favs.map((ev) => (
            <div key={ev.id} className="fav-card">
              {ev.image && (
                <img src={ev.image} alt={ev.name} className="fav-image" />
              )}
              <div className="fav-info">
                <Link to={`/event/${ev.id}`} className="fav-link">
                  <h3>{ev.name}</h3>
                </Link>
                <p>{ev.date}</p>
                {ev.venue && <p>{ev.venue}</p>}

                <button
                  onClick={() => handleRemove(ev.id)}
                  className="remove-btn"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
