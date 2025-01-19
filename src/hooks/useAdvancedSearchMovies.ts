import { ISearchCriteria } from "@/types/SearchCriteria.ts";
import { useQuery } from "@tanstack/react-query";
import { IMovie } from "@/types/Movie.ts";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const useAdvancedSearchMovies = (
    searchCriteria: ISearchCriteria,
    isSearchClicked: boolean
) => {
    return useQuery({
        queryKey: ["advancedSearchMovies", searchCriteria],
        queryFn: () => advancedSearchMovies(searchCriteria),
        enabled: isSearchClicked,
    });
};

const advancedSearchMovies = async (searchCriteria: ISearchCriteria): Promise<IMovie[]> => {
    const { query, genres, year, rating } = searchCriteria;
    const params = new URLSearchParams({
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "en-US",
        include_adult: "false",
        sort_by: "popularity.desc",
    });

    if (query) {
        params.append("with_text_query", query);
    }

    if (genres && genres.length > 0) {
        params.append("with_genres", genres.join(","));
    }

    if (year) {
        params.append("primary_release_year", year.toString());
    }

    if (rating) {
        params.append("vote_average.gte", rating.toString());
    }

    const response = await fetch(`${TMDB_BASE_URL}/discover/movie?${params}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data.results;
};
