import React from "react";
import { IMovie } from "@/types/Movie";
import { Link } from "react-router-dom";
import { MdOutlineBookmark } from "react-icons/md";

interface MovieSearchResultsProps {
    movies: IMovie[];
    isAuthenticated: boolean;
    isFavourite: (id: number) => boolean;
    onToggleFavourite: (movie: IMovie) => void;
    isWatched: (id: number) => boolean;
    onToggleWatched: (movie: IMovie) => void;
}

const AdvanceSearchResults: React.FC<MovieSearchResultsProps> = ({
    movies,
    isAuthenticated,
    isFavourite,
    onToggleFavourite,
}) => {
    return (
        <div className="space-y-8">
            {movies.map((movie) => (
                <div key={movie.id} className="flex border-b border-gray-200 pb-7">
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
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                            {movie.overview}
                        </p>
                        <div className="mt-2 flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-sm font-medium">
                                {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                        {isAuthenticated && (
                            <div className="mt-2 flex space-x-2">
                                <button
                                    onClick={() => onToggleFavourite(movie)}
                                    className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-200 flex items-center ${
                                        isFavourite(movie.id)
                                            ? "bg-purple-600 text-white hover:bg-purple-700"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    }`}
                                >
                                    <MdOutlineBookmark className="mr-1" />
                                    {isFavourite(movie.id) ? "Remove Favourite" : "Favourite"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvanceSearchResults;
