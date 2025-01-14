import React from 'react';
import { Link } from 'react-router-dom';
import { IMovie } from '@/types/Movie';
import { MdStar, MdStarBorder } from 'react-icons/md';

interface MovieCardProps {
    movie: IMovie;
    IsWatchlist: boolean;
    onToggleWatchlist: () => void;
    isAuthenticated: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, IsWatchlist, onToggleWatchlist, isAuthenticated }) => {
    return (
        <div
            className="flex flex-col h-full"
        >
            <div
                className="bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl flex-grow">
                <Link to={`/movie/${movie.id}`} className="block relative group h-full">
                    <div className="overflow-hidden h-full pb-[150%] relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                        />
                        <div
                            className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
                        <div
                            className="absolute inset-0 flex items-center justify-center p-4 opacity-0 transition-all duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex flex-col items-center">
                                {movie.vote_average !== null && (
                                    <div className="bg-yellow-400 text-black font-bold rounded-full px-3 py-1 mb-3">
                                        ★ {movie.vote_average.toFixed(1)}
                                    </div>
                                )}
                                <button
                                    className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="mt-2 flex justify-between items-center">
                <div className="flex-grow overflow-hidden">
                    <h2 className="text-sm font-semibold truncate text-gray-900" title={movie.title}>{movie.title}</h2>
                    <p className="text-sm text-gray-600">{new Date(movie.release_date).getFullYear()}</p>
                </div>
                {/* Watchlist Toggle Button */}
                {isAuthenticated && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleWatchlist();
                        }}
                        className="text-yellow-400 hover:text-yellow-500 transition-colors duration-300 ml-2 flex-shrink-0"
                        title={IsWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {IsWatchlist ? (
                            <MdStar size={24}/>
                        ) : (
                            <MdStarBorder size={24}/>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;