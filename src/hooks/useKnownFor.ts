import { useQuery } from "@tanstack/react-query";
import { fetchKnownForMovies } from "@/api/tmdb";
import { IMovie } from "@/types/Movie";

export const useKnownFor = (personId: number) => {
    return useQuery<IMovie[], Error>({
        queryKey: ["knownFor", personId],
        queryFn: () => fetchKnownForMovies(personId),
    });
};
