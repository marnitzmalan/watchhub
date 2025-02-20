import { createApiError } from "./apiErrors";
import { ISearchCriteria } from "@/types/SearchCriteria.ts";
import { IMovie } from "@/types/Movie.ts";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const CACHE_DURATION = 60 * 60 * 1000;

const getFromCache = (key: string) => {
    const cached = localStorage.getItem(key);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }
    return null;
};

const setToCache = (key: string, data: any) => {
    localStorage.setItem(
        key,
        JSON.stringify({
            data,
            timestamp: Date.now(),
        })
    );
};

const transformImageUrls = (data: any) => {
    if (typeof data !== "object" || data === null) return data;

    if (Array.isArray(data)) {
        return data.map(transformImageUrls);
    }

    const transformed = { ...data };
    for (const [key, value] of Object.entries(transformed)) {
        if (typeof value === "string" && (key.includes("path") || key.includes("url"))) {
            if (value.startsWith("/")) {
                transformed[key] = `https://image.tmdb.org/t/p/w500${value}`;
                transformed[`${key}_original`] = `https://image.tmdb.org/t/p/original${value}`;
                transformed[`${key}_low`] = `https://image.tmdb.org/t/p/w92${value}`;
            }
        } else if (typeof value === "object" && value !== null) {
            transformed[key] = transformImageUrls(value);
        }
    }
    return transformed;
};

/**
 * Fetches data from The Movie Database (TMDB) API.
 *
 * @template T - The expected type of the response data.
 * @param {string} endpoint - The specific TMDB API endpoint to request (e.g., "/movie/popular").
 * @param {Record<string, unknown>} [params] - Optional key-value pairs for additional query parameters.
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response data.
 * @throws {ApiError} If the API request fails or returns a non-OK status.
 */
export const fetchFromTMDB = async <T>(
    endpoint: string,
    params?: Record<string, unknown>
): Promise<T> => {
    const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);
    url.searchParams.append("api_key", TMDB_API_KEY);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const cacheKey = url.toString();
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
        return cachedData as T;
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw createApiError(response.status, `TMDB API error: ${response.statusText}`);
    }
    const data = await response.json();
    const transformedData = transformImageUrls(data);
    setToCache(cacheKey, transformedData);
    return transformedData;
};

/**
 * Fetches person details including movie and TV credits.
 *
 * @param personId - TMDB person ID.
 * @returns Promise resolving to person details.
 * @throws {ApiError} On API request failure.
 */
export const fetchTMDBPersonDetails = async (personId: number) => {
    return fetchFromTMDB(`/person/${personId}`, { append_to_response: "movie_credits,tv_credits" });
};

/**
 * Fetches popular movies from TMDB.
 *
 * @param page - Page number (default: 1).
 * @returns Promise resolving to popular movies.
 */
export const fetchTMDBPopularMovies = async (page = 1) => {
    return fetchFromTMDB("/movie/popular", { page });
};

/**
 * Fetches trending movies from TMDB.
 *
 * @param timeWindow - Time window for trending movies ("day" or "week").
 * @returns Promise resolving to trending movies.
 */
export const fetchTMDBTrendingMovies = async (timeWindow: "day" | "week") => {
    return fetchFromTMDB(`/trending/movie/${timeWindow}`);
};

/**
 * Fetches recommended movies for a specific movie from TMDB.
 *
 * @param movieId - TMDB movie ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to recommended movies.
 */
export const fetchTMDBRecommendedMovies = async (movieId: number, page = 1) => {
    return fetchFromTMDB(`/movie/${movieId}/recommendations`, { page });
};

/**
 * Fetches detailed information about a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie details.
 */
export const fetchTMDBMovieDetails = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}`);
};

/**
 * Fetches credits for a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie credits.
 */
export const fetchTMDBMovieCredits = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/credits`);
};

/**
 * Fetches videos associated with a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie videos.
 */
export const fetchTMDBMovieVideos = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/videos`);
};

/**
 * Fetches keywords associated with a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie keywords.
 */
export const fetchTMDBMovieKeywords = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/keywords`);
};

/**
 * Fetches release dates for a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie release dates.
 */
export const fetchTMDBMovieReleaseDates = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/release_dates`);
};

/**
 * Fetches known for movies for a specific person from TMDB.
 *
 * @param personId - TMDB person ID.
 * @returns Promise resolving to known for movies.
 */
export const fetchKnownForMovies = async (personId: number): Promise<IMovie[]> => {
    const data = await fetchFromTMDB<{ cast: IMovie[] }>(`/person/${personId}/movie_credits`);

    // Sort the cast by popularity and slice to get the top 10 movies
    return data.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10)
        .map((movie) => ({
            ...movie,
            media_type: "movie",
        }));
};

/**
 * Fetches reviews for a specific movie from TMDB.
 *
 * @param movieId - TMDB movie ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to movie reviews.
 */
export const fetchTMDBMovieReviews = async (movieId: number, page = 1) => {
    return fetchFromTMDB(`/movie/${movieId}/reviews`, { page });
};

/**
 * Fetches movie certifications.
 *
 * @returns Promise resolving to movie certifications.
 */
export const fetchTMDBMovieCertifications = async () => {
    return fetchFromTMDB(`/certification/movie/list`);
};

/**
 * Searches for movies in TMDB.
 *
 * @param query - The search query string.
 * @param page - The page number of results to fetch (default: 1).
 * @returns Promise resolving to search results.
 */
export const searchTMDBMovies = async (query: string, page: number = 1) => {
    return fetchFromTMDB("/search/movie", { query, page });
};

/**
 * Searches for movies in TMDB.
 *
 * @returns Promise resolving to search results.
 * @param searchCriteria
 */
export const fetchTMDBAdvancedSearchMovies = async (
    searchCriteria: ISearchCriteria
): Promise<IMovie[]> => {
    const { query, genres, year, rating } = searchCriteria;
    const params: Record<string, string> = {
        include_adult: "false",
        sort_by: "popularity.desc",
    };

    if (query) {
        params.with_text_query = query;
    }

    if (genres && genres.length > 0) {
        params.with_genres = genres.join(",");
    }

    if (year) {
        params.primary_release_year = year.toString();
    }

    if (rating) {
        params["vote_average.gte"] = rating.toString();
    }

    const data = await fetchFromTMDB<{ results: IMovie[] }>("/discover/movie", params);
    return data.results;
};

/**
 * Fetches popular TV series from TMDB.
 *
 * @param page - Page number (default: 1).
 * @returns Promise resolving to popular TV series.
 */
export const fetchTMDBPopularSeries = async (page = 1) => {
    return fetchFromTMDB("/tv/popular", { page });
};

/**
 * Fetches TV series details from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series details.
 */
export const fetchTMDBSeriesDetails = async (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}`);
};

export const fetchSeriesDetails = async (seriesId: number) => {
    try {
        const [series] = await Promise.all([fetchFromTMDB(`/tv/${seriesId}`)]);
        return {
            series,
        };
    } catch (error) {
        console.error("Error fetching series details:", error);
        throw new Error("Failed to fetch series details");
    }
};
