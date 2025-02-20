import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "@/types/Movie";
import { MdRemoveCircle, MdVisibility } from "react-icons/md";

interface GridLayoutProps {
    movies: IMovie[];
    onToggleFavourite?: (movie: IMovie) => void;
    onToggleWatched?: (movie: IMovie) => void;
    isFavourite?: (movieId: number) => boolean;
    isWatched?: (movieId: number) => boolean;
    listType: "favorites" | "watched";
}

const GridLayout: React.FC<GridLayoutProps> = ({
    movies,
    onToggleFavourite,
    onToggleWatched,
    isFavourite,
    isWatched,
    listType,
}) => {
    if (!movies || movies.length === 0) {
        return <div>No movies available.</div>;
    }

    const handleToggle = (movie: IMovie) => {
        if (listType === "favorites" && onToggleFavourite) {
            onToggleFavourite(movie);
        } else if (listType === "watched" && onToggleWatched) {
            onToggleWatched(movie);
        }
    };

    return (
        <div className="space-y-4">
            {movies.map((movie) => (
                <div key={movie.id} className="flex bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                        className="w-16 h-24 object-cover"
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                : "/placeholder.png"
                        }
                        alt={`${movie.title} poster`}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/placeholder.png";
                        }}
                    />
                    <div className="flex-grow p-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">{movie.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{movie.release_date}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Link
                                to={`/movie/${movie.id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="View"
                            >
                                <MdVisibility size={24} />
                            </Link>
                            <button
                                onClick={() => handleToggle(movie)}
                                className="text-red-500 hover:text-red-700"
                                title="Remove"
                            >
                                <MdRemoveCircle size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GridLayout;
