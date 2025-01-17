import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "@/api/movies";
import { IGenre } from "@/types/Genre";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { useWatched } from "@/hooks/useWatched";
import ProgressiveImage from "@/components/ProgressiveImage";
import RecommendedMovies from "@/components/RecommendedMovies";
import { MdArrowBack, MdOutlineBookmark, MdRemoveRedEye } from "react-icons/md";
import AppButton from "@/components/ui/AppButton";
import MovieReviews from "@/components/MovieReviews";

interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movieData, isLoading, error } = useMovieDetails(Number(id));
    const { isFavourite, toggleFavourite } = useFavourite();
    const { isWatched, toggleWatched } = useWatched();
    const { isAuthenticated } = useAuth();
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;
    if (!movieData || !movieData.movie) return <div>Movie not found</div>;

    const { movie, credits, videos } = movieData;
    const posterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";
    const lowQualityPosterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
        : "";

    const topCast: Actor[] = credits?.cast
        ? credits.cast.slice(0, 12).map((actor) => ({
              id: actor.id,
              name: actor.name,
              character: actor.character,
              profile_path: actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : null,
          }))
        : [];

    const director = credits?.crew?.find((person) => person.job === "Director");
    const writers = credits?.crew?.filter((person) => person.department === "Writing").slice(0, 2);

    const trailer = videos?.find((video) => video.type === "Trailer" && video.site === "YouTube");

    const ageRating = movie.age_rating || "Not Rated";
    const [countryCode, fullRating] = ageRating.split(": ");
    const [ratingCode, ratingDescription] = fullRating ? fullRating.split(" (") : [ageRating, ""];
    const displayRating = ratingCode.replace(/^[A-Z]{2}-/, ""); // Remove country code prefix if present

    const handleToggleFavourite = () => {
        if (movie) {
            toggleFavourite(movie);
        }
    };

    const handleToggleWatched = () => {
        if (movie) {
            toggleWatched(movie);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <AppButton
                variant="text"
                onClick={() => window.history.back()}
                icon={<MdArrowBack />}
                className="mb-4"
            >
                Back
            </AppButton>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 relative">
                    {posterSrc ? (
                        <div className="relative">
                            <ProgressiveImage
                                lowQualitySrc={lowQualityPosterSrc}
                                highQualitySrc={posterSrc}
                                alt={movie.title}
                                className="w-full rounded-lg shadow-lg"
                            />
                            {isAuthenticated && (
                                <>
                                    <div className="absolute top-0 right-0 m-2">
                                        <button
                                            onClick={handleToggleFavourite}
                                            className={`p-2 rounded-full ${
                                                isFavourite(movie.id)
                                                    ? "bg-red-400 bg-opacity-75 text-white"
                                                    : "bg-black bg-opacity-50 text-white"
                                            } hover:bg-opacity-100 transition-colors duration-200`}
                                            title={
                                                isFavourite(movie.id)
                                                    ? "Remove from Favorites"
                                                    : "Add to Favorites"
                                            }
                                        >
                                            <MdOutlineBookmark size={24} />
                                        </button>
                                    </div>
                                    <div className="absolute top-0 left-0 m-2">
                                        <button
                                            onClick={handleToggleWatched}
                                            className={`p-2 rounded-full ${
                                                isWatched(movie.id)
                                                    ? "bg-green-400 bg-opacity-75 text-white"
                                                    : "bg-black bg-opacity-50 text-white"
                                            } hover:bg-opacity-100 transition-colors duration-200`}
                                            title={
                                                isWatched(movie.id)
                                                    ? "Mark as Unwatched"
                                                    : "Mark as Watched"
                                            }
                                        >
                                            <MdRemoveRedEye size={24} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-0 pb-[150%] bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
                    )}
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-600 mb-4">
                        {new Date(movie.release_date).getFullYear()} • {movie.runtime} min
                        <span
                            className="bg-gray-200 text-gray-800 ml-4 px-2 py-1 rounded text-sm relative cursor-help"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            {displayRating}
                            {showTooltip && ratingDescription && (
                                <span className="absolute left-0 top-full mt-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                                    {`${countryCode}: ${ratingDescription.replace(")", "")}`}
                                </span>
                            )}
                        </span>
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                        {movie.genres.map((genre: IGenre) => (
                            <span
                                key={genre.id}
                                className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="mb-4">
                        <span className="bg-yellow-400 text-black font-bold rounded px-2 py-1 mr-2">
                            IMDb {movie.vote_average.toFixed(1)}
                        </span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Overview</h2>
                        <p>{movie.overview}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold">Director</h3>
                        <p>{director ? director.name : "N/A"}</p>

                        <h3 className="font-bold mt-2">Writers</h3>
                        <p>
                            {writers && writers.length > 0
                                ? writers.map((w) => w.name).join(", ")
                                : "N/A"}
                        </p>
                    </div>

                    {movie.keywords && movie.keywords.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Keywords</h2>
                            <div className="flex flex-wrap gap-2">
                                {movie.keywords.map((keyword: { id: number; name: string }) => (
                                    <span
                                        key={keyword.id}
                                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
                                    >
                                        {keyword.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {topCast.map((actor) => (
                        <div key={actor.id} className="text-center">
                            {actor.profile_path ? (
                                <img
                                    src={actor.profile_path}
                                    alt={actor.name}
                                    className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
                                />
                            ) : (
                                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-2"></div>
                            )}
                            <p className="font-semibold">{actor.name}</p>
                            <p className="text-sm text-gray-600">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                {trailer ? (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={`${movie.title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>
                ) : (
                    <div className="relative w-full bg-gray-200" style={{ paddingTop: "56.25%" }}>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            No trailer available
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">More Like This</h2>
                <RecommendedMovies movieId={movie.id} />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
                <MovieReviews movieId={movie.id} />
            </div>
        </div>
    );
};

export default MovieDetailPage;
