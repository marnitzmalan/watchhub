import React from "react";

interface personHeaderProps {
    person: {
        name: string;
        profile_path: string | null;
    };
}

const personHeader: React.FC<personHeaderProps> = ({ person }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800">
            <div className="max-w-screen-xl mx-auto p-4 flex items-center">
                <img
                    src={
                        person.profile_path
                            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                            : "/placeholder.jpg"
                    }
                    alt={person.name}
                    className="w-32 h-32 rounded-full object-cover mr-6"
                />
                <h1 className="text-4xl font-bold">{person.name}</h1>
            </div>
        </div>
    );
};

export default personHeader;
