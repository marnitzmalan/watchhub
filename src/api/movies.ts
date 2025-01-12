import api from './index';

export const getPopularMovies = (page = 1) =>
    api.get('/movie/popular', { params: { page } });

export const searchMovies = (query: string, page = 1) =>
    api.get('/search/movie', { params: { query, page } });

export const getMovieDetails = (movieId: number) =>
    api.get(`/movie/${movieId}`);