import { fetchSeriesDetails } from "@/api/tmdb.ts";
import { useQuery } from "@tanstack/react-query";

export const useSeriesDetails = ({ seriesId }: { seriesId: number }) => {
    return useQuery({
        queryKey: ["seriesDetails", seriesId],
        queryFn: () => fetchSeriesDetails(seriesId),
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
    });
};
