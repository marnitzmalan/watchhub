import { IMovie } from "@/types/Movie.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchTMDBPopularMovies, fetchTMDBMovieDetails } from "@/api/tmdb.ts";

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ["popularMovies", page],
        queryFn: async () => {
            interface TMDBResponse {
                results: IMovie[];
            }

            const tmdbData = (await fetchTMDBPopularMovies(page)) as TMDBResponse;

            // Fetch detailed information (including genres) for each movie
            return await Promise.all(
                tmdbData.results.map(async (movie: IMovie) => {
                    const detailData = (await fetchTMDBMovieDetails(movie.id)) as { genres: any[] };
                    return {
                        ...movie,
                        genres: detailData.genres,
                    };
                })
            );
        },
    });
};
