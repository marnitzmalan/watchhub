import { useApiQuery } from './index';
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'
import { IMovie } from '@/types/Movie';

export const useSearchMovies = (query: string, page = 1) =>
    useApiQuery('/search/movie', { query, page, sort_by: 'popularity.desc' });

export const useMovieDetails = (movieId: number) =>
    useApiQuery(`/movie/${movieId}`);

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ['popularMovies', page],
        queryFn: async () => {
            // First, try to fetch from Supabase
            const { data, error } = await supabase
                .from('movies')
                .select('*')
                .order('popularity', { ascending: false })
                .range((page - 1) * 20, page * 20 - 1)

            if (error || !data || data.length === 0) {
                // If there's an error or no data, fetch from TMDB
                const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`);
                const tmdbData = await tmdbResponse.json();

                // Insert the fetched data into Supabase
                const { error: insertError } = await supabase
                    .from('movies')
                    .upsert(tmdbData.results.map((movie: IMovie) => ({
                        id: movie.id,
                        title: movie.title,
                        popularity: movie.popularity,
                        release_date: movie.release_date,
                        overview: movie.overview,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average
                    })))

                if (insertError) throw insertError;

                // Return the data from TMDB
                return tmdbData.results;
            }

            // If data exists in Supabase, return it
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}