import { useQuery } from "@tanstack/react-query";
import {
    fetchTMDBMovieDetails,
    fetchTMDBMovieCredits,
    fetchTMDBMovieVideos,
    fetchTMDBMovieKeywords,
    fetchTMDBMovieReleaseDates,
    fetchTMDBMovieCertifications,
} from "@/api/tmdb.ts";

export const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: async () => {
            const [movieDetails, credits, videos, keywords, releaseDates, certifications] =
                await Promise.all([
                    fetchTMDBMovieDetails(movieId),
                    fetchTMDBMovieCredits(movieId),
                    fetchTMDBMovieVideos(movieId),
                    fetchTMDBMovieKeywords(movieId),
                    fetchTMDBMovieReleaseDates(movieId),
                    fetchTMDBMovieCertifications(),
                ]);

            // Type assertions for all variables
            const typedMovieDetails = movieDetails as any;
            const typedCredits = credits as { cast: any[]; crew: any[] };
            const typedVideos = videos as { results: any[] };
            const typedKeywords = keywords as { keywords: { id: number; name: string }[] };
            const typedReleaseDates = releaseDates as { results: any[] };
            const typedCertifications = certifications as any;

            return {
                movie: {
                    ...typedMovieDetails,
                    keywords: typedKeywords.keywords.slice(0, 10),
                    release_dates: typedReleaseDates.results,
                },
                credits: {
                    cast: typedCredits.cast.slice(0, 18),
                    crew: typedCredits.crew,
                },
                videos: typedVideos.results,
                certifications: typedCertifications,
            };
        },
    });
};
