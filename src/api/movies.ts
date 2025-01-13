import { useApiQuery } from './index';

export const useSearchMovies = (query: string, page = 1) =>
    useApiQuery('/search/movie', { query, page, sort_by: 'popularity.desc' });

export const useMovieDetails = (movieId: number) =>
    useApiQuery(`/movie/${movieId}`);

export const usePopularMovies = (page = 1) =>
    useApiQuery('/movie/popular', { page });