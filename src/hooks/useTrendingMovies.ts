import { useQuery } from "@tanstack/react-query";
import { fetchTMDBTrendingMovies } from "@/api/tmdb";

export const useTrendingMovies = (timeWindow: "day" | "week" = "week") => {
    return useQuery({
        queryKey: ["trendingMovies", timeWindow],
        queryFn: () => fetchTMDBTrendingMovies(timeWindow),
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};
