import React from "react";

interface AdditionalInfoProps {
    movie: {
        release_date: string;
        runtime: number;
        budget: number;
        revenue: number;
        keywords?: { id: number; name: string }[];
    };
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ movie }) => {
    return (
        <div className="sticky top-16 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Additional Info</h2>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Release Date:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {new Date(movie.release_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Runtime:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Budget:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    ${movie.budget?.toLocaleString()}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Revenue:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    ${movie.revenue?.toLocaleString()}
                </span>
            </div>

            {/* Keywords */}
            {movie.keywords && movie.keywords.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                        {movie.keywords.map((keyword) => (
                            <span
                                key={keyword.id}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-sm"
                            >
                                {keyword.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdditionalInfo;
