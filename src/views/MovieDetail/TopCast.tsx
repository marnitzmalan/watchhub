import React from "react";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface TopCastProps {
    cast: Actor[];
    movieId: number;
}

const TopCast: React.FC<TopCastProps> = ({ cast, movieId }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Top Billed Cast</h2>
            <div className="relative">
                <div className="overflow-x-auto flex space-x-4 pb-4">
                    {cast.map((actor) => (
                        <div key={actor.id} className="flex-shrink-0 w-32">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                        alt={actor.name}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                                <div className="p-2">
                                    <p className="font-semibold text-sm truncate">{actor.name}</p>
                                    <p className="text-xs text-gray-600 truncate">
                                        {actor.character}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-40 flex items-center pl-4">
                        <Link
                            to={`/movie/${movieId}/cast`}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex flex-col items-center"
                        >
                            <span className="text-3xl mb-2">
                                <MdArrowForward />
                            </span>
                            <span className="text-sm font-semibold">View More</span>
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </div>
    );
};

export default TopCast;
