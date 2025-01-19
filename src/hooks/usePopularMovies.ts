import { useQuery } from "@tanstack/react-query";
import { IMovie } from "@/types/Movie.ts";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ["popularMovies", page],
        queryFn: async () => {
            const tmdbResponse = await fetch(
                `${TMDB_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`
            );
            const tmdbData = await tmdbResponse.json();

            // Fetch detailed information (including genres) for each movie
            return await Promise.all(
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
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
