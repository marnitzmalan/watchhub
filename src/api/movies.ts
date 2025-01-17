import { useQuery } from "@tanstack/react-query";
import { useApiQuery } from "@/api/index.ts";
import { IMovie } from "@/types/Movie";
import { ISearchCriteria } from "@/types/SearchCriteria";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const useSearchMovies = (query: string, page = 1) =>
    useApiQuery("/search/movie", { query, page, sort_by: "popularity.desc" });

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

export const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: async () => {
            const [movieDetails, credits, videos] = await Promise.all([
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
                fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                ).then((res) => res.json()),
            ]);

            return {
                movie: movieDetails,
                credits: {
                    cast: credits.cast.slice(0, 6),
                    crew: credits.crew,
                },
                videos: videos.results,
            };
        },
    });
};

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ["popularMovies", page],
        queryFn: async () => {
            const tmdbResponse = await fetch(
                `${TMDB_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`
            );
            const tmdbData = await tmdbResponse.json();

            // Fetch detailed information (including genres) for each movie
            return await Promise.all(
                tmdbData.results.map(async (movie: IMovie) => {
                    const detailResponse = await fetch(
                        `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                    );
                    const detailData = await detailResponse.json();
                    return {
                        ...movie,
                        genres: detailData.genres,
                    };
                })
            );
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

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
