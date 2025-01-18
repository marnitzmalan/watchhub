import React from "react";

interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface TopCastProps {
    cast: Actor[];
}

const TopCast: React.FC<TopCastProps> = ({ cast }) => {
    return (
        <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                        {actor.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
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
    );
};

export default TopCast;
