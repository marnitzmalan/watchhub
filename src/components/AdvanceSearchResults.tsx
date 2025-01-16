import React from "react";
import { IMovie } from "@/types/Movie";
import { Link } from "react-router-dom";

interface MovieSearchResultsProps {
    movies: IMovie[];
    isAuthenticated: boolean;
    isWatchlist: (id: number) => boolean;
    onToggleWatchlist: (movie: IMovie) => void;
}

const AdvanceSearchResults: React.FC<MovieSearchResultsProps> = ({
    movies,
    isAuthenticated,
    isWatchlist,
    onToggleWatchlist,
}) => {
    return (
        <div className="space-y-8">
            {movies.map((movie) => (
                <div key={movie.id} className="flex border-b border-gray-200 py-4">
                    <Link to={`/movie/${movie.id}`}>
                        <div className="flex-shrink-0 w-24 h-36">
                            <img
                                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                    </Link>
                    <div className="ml-4 flex-grow">
                        <Link
                            to={`/movie/${movie.id}`}
                            className="text-xl font-semibold text-gray-700 hover:underline"
                        >
                            {movie.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                            {new Date(movie.release_date).getFullYear()}
                        </p>
                        <p className="text-sm text-gray-700 mt-2 line-clamp-3">{movie.overview}</p>
                        <div className="mt-2 flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-sm font-medium">
                                {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                        {isAuthenticated && (
                            <button
                                onClick={() => onToggleWatchlist(movie)}
                                className={`mt-2 px-3 py-1 text-sm font-medium rounded ${
                                    isWatchlist(movie.id)
                                        ? "bg-yellow-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-yellow-100"
                                }`}
                            >
                                {isWatchlist(movie.id)
                                    ? "Remove from Watchlist"
                                    : "Add to Watchlist"}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvanceSearchResults;
