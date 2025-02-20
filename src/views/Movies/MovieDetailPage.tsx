import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { useWatched } from "@/hooks/useWatched";
import RecommendedMovies from "@/components/RecommendedMovies";
import MovieReviews from "@/components/MovieReviews";
import TopCast from "@/views/MovieDetail/TopCast";
import MovieDetailContent from "@/views/MovieDetail/MovieDetailContent";
import AdditionalInfo from "@/views/MovieDetail/AdditionalInfo";

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = id ? parseInt(id, 10) : 0;
    const { data: movieDetails, isLoading, error } = useMovieDetails(movieId);
    const { user } = useAuth();
    const { isFavourite, toggleFavourite } = useFavourite(movieId);
    const { isWatched, toggleWatched } = useWatched(movieId);

    const handleToggleFavourite = useCallback(() => {
        if (movieDetails?.movie) {
            toggleFavourite(movieDetails.movie);
        }
    }, [toggleFavourite, movieDetails?.movie]);

    const handleToggleWatched = useCallback(() => {
        if (movieDetails?.movie) {
            toggleWatched(movieDetails.movie);
        }
    }, [toggleWatched, movieDetails?.movie]);

    if (isLoading) return <div>Loading...</div>;
    if (error || !movieDetails) return <div>Error loading movie details</div>;

    const { movie, credits, videos } = movieDetails;
    const director = credits?.crew.find((person) => person.job === "Director");
    const writers = credits.crew.filter((person) => ["Screenplay", "Writer"].includes(person.job));
    const topCast = credits.cast.slice(0, 18);
    const trailer = videos.find((video) => video.type === "Trailer");

    const backdropPath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : null;
    const lowQualityBackdropPath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`
        : null;
    const posterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;
    const lowQualityPosterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
        : null;

    return (
        <div>
            <MovieDetailContent
                movie={movie}
                backdropPath={backdropPath}
                lowQualityBackdropPath={lowQualityBackdropPath}
                posterSrc={posterSrc}
                lowQualityPosterSrc={lowQualityPosterSrc}
                director={director}
                writers={writers}
                isAuthenticated={!!user}
                isFavourite={isFavourite(movieId)}
                handleToggleFavourite={handleToggleFavourite}
                isWatched={isWatched(movieId)}
                handleToggleWatched={handleToggleWatched}
                trailerKey={trailer?.key}
            />

            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="md:w-2/3 md:pr-8">
                        <div className="mt-8">
                            <TopCast cast={topCast} movieId={movieId} />
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">More Like This</h2>
                            <RecommendedMovies movieId={movie.id} />
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
                            <MovieReviews movieId={movie.id} />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="md:w-1/3 mt-8">
                        <AdditionalInfo movie={movie} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
