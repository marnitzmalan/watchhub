import { UseQueryResult } from "@tanstack/react-query";
import { searchTMDBMovies } from "@/api/tmdb";
import { ISearchMoviesResponse } from "@/types/SearchMoviesResponse.ts";
import { ApiError } from "@/api/apiErrors";
import { useApiQuery } from "./useApiQuery";

/**
 * A custom hook for searching movies using the TMDB API.
 *
 * @param {string} query The search query string
 * @param {number} [page=1] The page number of results to fetch (default: 1)
 * @returns {UseQueryResult<ISearchMoviesResponse, ApiError>} The result of the search query
 */
export const useSearchMovies = (
    query: string,
    page: number = 1
): UseQueryResult<ISearchMoviesResponse, ApiError> =>
    useApiQuery<ISearchMoviesResponse>(
        ["searchMovies", query, page],
        () => searchTMDBMovies(query, page) as Promise<ISearchMoviesResponse>,
        {
            enabled: !!query,
        }
    );
