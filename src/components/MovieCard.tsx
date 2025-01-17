import React from "react";
import { Link } from "react-router-dom";
import { MdRemoveRedEye, MdOutlineBookmark } from "react-icons/md";
import ProgressiveImage from "./ProgressiveImage";
import { useWatched } from "@/hooks/useWatched.ts";
import { useFavourite } from "@/hooks/useFavourite.ts";
import { IMovie } from "@/types/Movie"; // Make sure to import the IMovie type

interface MovieCardProps {
    movie: IMovie;
    isAuthenticated: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isAuthenticated }) => {
    const lowQualityPosterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
        : "";
    const highQualityPosterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";

    const { isWatched, toggleWatched } = useWatched();
    const { isFavourite, toggleFavourite } = useFavourite();

    const handleToggleWatched = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWatched(movie);
    };

    const handleToggleFavourite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavourite(movie);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl flex-grow relative">
                <Link to={`/movie/${movie.id}`} className="block relative group h-full">
                    <div className="overflow-hidden h-full pb-[150%] relative">
                        <ProgressiveImage
                            lowQualitySrc={lowQualityPosterSrc}
                            highQualitySrc={highQualityPosterSrc}
                            alt={movie.title}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
                        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 transition-all duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex flex-col items-center">
                                {movie.vote_average !== null && (
                                    <div className="bg-yellow-400 text-black font-bold rounded-full px-3 py-1 mb-3">
                                        ★ {movie.vote_average.toFixed(1)}
                                    </div>
                                )}
                                <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
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
                                title={isWatched(movie.id) ? "Watched" : "Mark as Watched"}
                            >
                                <MdRemoveRedEye size={24} />
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="mt-2">
                <h2 className="text-sm font-semibold truncate text-gray-900" title={movie.title}>
                    {movie.title}
                </h2>
                <p className="text-sm text-gray-600">
                    {new Date(movie.release_date).getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
