import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key

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