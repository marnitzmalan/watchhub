import { useQuery } from "@tanstack/react-query";
import { fetchTMDBRecommendedMovies } from "@/api/tmdb";
import { IMovie } from "@/types/Movie";

export const useRecommendedMovies = (movieId: number) => {
    return useQuery<IMovie[]>({
        queryKey: ["recommendedMovies", movieId],
        queryFn: async () => {
            const data = await fetchTMDBRecommendedMovies(movieId);
            return data.results.slice(0, 10); // Return only the first 10 recommendations
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
