import axios from 'axios';
const BASE = 'https://app.ticketmaster.com/discovery/v2';

export async function searchEvents({ keyword='', city='' }) {
  const res = await axios.get(`${BASE}/events.json`, {
    params: {
      apikey: process.env.REACT_APP_TICKETMASTER_KEY,
      keyword,
      city,
      size: 20
    }
  });
  return res.data?._embedded?.events ?? [];
}

export async function getEventById(id) {
  const res = await axios.get(`${BASE}/events/${id}.json`, {
    params: { apikey: process.env.REACT_APP_TICKETMASTER_KEY }
  });
  return res.data;
}
