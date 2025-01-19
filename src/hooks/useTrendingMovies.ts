import { useQuery } from "@tanstack/react-query";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

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
