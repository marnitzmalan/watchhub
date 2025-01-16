import { useApiQuery } from "./index";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client.ts";
import { IMovie } from "@/types/Movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const useSearchMovies = (query: string, page = 1) =>
    useApiQuery("/search/movie", { query, page, sort_by: "popularity.desc" });

export const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: async () => {
            const [movieDetails, credits] = await Promise.all([
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
            ]);

            return {
                ...movieDetails,
                cast: credits.cast.slice(0, 6), // Get top 6 cast members
            };
        },
    });
};

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ["popularMovies", page],
        queryFn: async () => {
            // First, try to fetch from Supabase
            const { data, error } = await supabase
                .from("movies")
                .select("*")
                .order("popularity", { ascending: false })
                .range((page - 1) * 20, page * 20 - 1);

            if (error || !data || data.length === 0) {
                // If there's an error or no data, fetch from TMDB
                const tmdbResponse = await fetch(
                    `${TMDB_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`
                );
                const tmdbData = await tmdbResponse.json();

                // Fetch detailed information (including genres) for each movie
                const moviesWithDetails = await Promise.all(
                    tmdbData.results.map(async (movie: IMovie) => {
                        const detailResponse = await fetch(
                            `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                        );
                        const detailData = await detailResponse.json();
                        return {
                            ...movie,
                            genres: detailData.genres,
                        };
                    })
                );

                // Insert the fetched data into Supabase
                const { error: insertError } = await supabase.from("movies").upsert(
                    moviesWithDetails.map((movie: IMovie) => ({
                        id: movie.id,
                        title: movie.title,
                        popularity: movie.popularity,
                        release_date: movie.release_date,
                        overview: movie.overview,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average,
                        genres: movie.genres,
                    }))
                );

                if (insertError) throw insertError;

                // Return the data from TMDB
                return moviesWithDetails;
            }

            // If data exists in Supabase, return it
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useTrendingMovies = (timeWindow: "day" | "week" = "week") => {
    return useQuery({
        queryKey: ["trendingMovies", timeWindow],
        queryFn: async () => {
            const response = await fetch(
                `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};
