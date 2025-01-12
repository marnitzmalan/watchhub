import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
    console.error('TMDB API key is not set. Please check your environment variables.');
}

const api = axios.create({
    baseURL: API_BASE_URL,
    params: {
        api_key: API_KEY,
    },
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;