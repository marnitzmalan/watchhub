import { useQuery } from "@tanstack/react-query";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const useRecommendedMovies = (movieId: number) => {
    return useQuery({
        queryKey: ["recommendedMovies", movieId],
        queryFn: async () => {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
            );
            const data = await response.json();
            return data.results.slice(0, 10); // Return only the first 8 recommendations
        },
    });
};
