import { useQuery } from "@tanstack/react-query";
import { fetchTMDBMovieCredits } from "@/api/tmdb";

export const useMovieCredits = (movieId: number) => {
    return useQuery({
        queryKey: ["movieCredits", movieId],
        queryFn: () => fetchTMDBMovieCredits(movieId),
    });
};
