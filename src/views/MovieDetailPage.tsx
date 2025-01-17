import { useParams } from "react-router-dom";
import { useMovieDetails } from "@/api/movies";
import { IGenre } from "@/types/Genre";
import { useAuth } from "@/hooks/useAuth";
import { useWatchlist } from "@/hooks/useWatchlist";
import WatchlistRibbon from "@/components/WatchlistRibbon";
import { MdArrowBack } from "react-icons/md";

interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movieData, isLoading, error } = useMovieDetails(Number(id));
    const { user } = useAuth();
    const { isWatchlist, toggleWatchlist } = useWatchlist();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;
    if (!movieData || !movieData.movie) return <div>Movie not found</div>;

    const { movie, credits } = movieData;
    const posterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";

    const topCast: Actor[] = credits?.cast
        ? credits.cast.slice(0, 6).map((actor) => ({
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

    return (
        <div className="max-w-6xl mx-auto p-4">
            <button
                onClick={() => window.history.back()}
                className="text-gray-700 hover:text-gray-900 mb-4 block transition duration-300 ease-in-out hover:bg-gray-100 rounded-md px-3 py-2 flex items-center"
            >
                <MdArrowBack className="mr-2" /> Back
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 relative">
                    {posterSrc ? (
                        <div className="relative">
                            <img
                                src={posterSrc}
                                alt={movie.title}
                                className="w-full rounded-lg shadow-lg"
                            />
                            {user && (
                                <div className="absolute top-0 right-0 w-[15%] max-w-[64px] min-w-[48px]">
                                    <WatchlistRibbon
                                        isInWatchlist={isWatchlist(movie.id)}
                                        onClick={() => toggleWatchlist(movie)}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-[450px] bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
                    )}
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-600 mb-4">
                        {new Date(movie.release_date).getFullYear()} • {movie.runtime} min
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                        {movie.genres.map((genre: IGenre) => (
                            <span
                                key={genre.id}
                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
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
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* Placeholder for trailer */}
                    <div className="flex items-center justify-center h-full">
                        Trailer Placeholder
                    </div>
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
                <h2 className="text-2xl font-bold mb-4">More Like This</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Placeholder for similar movies */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
