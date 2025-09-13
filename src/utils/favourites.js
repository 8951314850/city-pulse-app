// src/utils/favourites.js

const STORAGE_KEY = "favouriteEvents";

export function getFavourites() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavourite(eventId) {
  const favs = getFavourites();
  return favs.some((ev) => ev.id === eventId);
}

export function addFavourite(event) {
  const favs = getFavourites();
  if (!isFavourite(event.id)) {
    favs.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  }
}

export function removeFavourite(eventId) {
  const favs = getFavourites().filter((ev) => ev.id !== eventId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}
