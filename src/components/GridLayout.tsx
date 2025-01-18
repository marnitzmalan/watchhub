import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "@/types/Movie";

interface GridLayoutProps {
    movies: IMovie[];
    onToggleFavourite: (movie: IMovie) => void;
    isFavourite: (movieId: number) => boolean;
}

const GridLayout: React.FC<GridLayoutProps> = ({ movies, onToggleFavourite, isFavourite }) => {
    if (!movies || movies.length === 0) {
        return <div>No movies available.</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <img
                        className="w-full h-48 object-cover"
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "/placeholder.png"
                        }
                        alt={`${movie.title} poster`}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/placeholder.png";
                        }}
                    />
                    <div className="p-4 flex-grow">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {movie.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {movie.release_date
                                ? new Date(movie.release_date).getFullYear()
                                : "N/A"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                        </p>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 text-xs">
                        <Link
                            to={`/movie/${movie.movie_id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                            View
                        </Link>
                        <button
                            onClick={() => onToggleFavourite(movie)}
                            className={`${
                                isFavourite(movie.id)
                                    ? "text-red-600 hover:text-red-900"
                                    : "text-blue-600 hover:text-blue-900"
                            }`}
                        >
                            {isFavourite(movie.id) ? "Remove" : "Add"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GridLayout;
