import { useQuery } from "@tanstack/react-query";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: async () => {
            const [movieDetails, credits, videos, keywords, releaseDates] = await Promise.all([
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}/keywords?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}/release_dates?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/certification/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
            ]);

            return {
                movie: {
                    ...movieDetails,
                    keywords: keywords.keywords.slice(0, 10),
                    release_dates: releaseDates.results,
                },
                credits: {
                    cast: credits.cast.slice(0, 18),
                    crew: credits.crew,
                },
                videos: videos.results,
            };
        },
    });
};
