import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useMovieCredits } from "@/hooks/useMovieCredits";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import ProgressiveImage from "@/components/ProgressiveImage";

const MovieCreditsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [movieId, setMovieId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"cast" | "crew">("cast");

    useEffect(() => {
        const stateMovieId = location.state?.movieId;
        const paramMovieId = id ? parseInt(id, 10) : null;
        setMovieId(stateMovieId || paramMovieId);
    }, [id, location.state]);

    const { data: movieDetails, isLoading: isLoadingDetails } = useMovieDetails(movieId ?? 0);
    const { data: credits, isLoading: isLoadingCredits } = useMovieCredits(movieId ?? 0);

    if (!movieId || isLoadingDetails || isLoadingCredits) {
        return <div>Loading...</div>;
    }

    if (!movieDetails || !credits) {
        return <div>Error: Unable to load movie data</div>;
    }

    const { title, poster_path, release_date } = movieDetails.movie;
    const { cast = [], crew = [] } = credits;

    const departments = Array.from(new Set(crew.map((c) => c.department))).sort();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Movie Header */}
            <div className="flex items-center mb-8">
                <ProgressiveImage
                    lowQualitySrc={`https://image.tmdb.org/t/p/w92${poster_path}`}
                    highQualitySrc={`https://image.tmdb.org/t/p/w342${poster_path}`}
                    alt={title || "Movie poster"}
                    className="w-32 h-48 object-cover rounded mr-6"
                />
                <div>
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-gray-600">
                        {release_date ? new Date(release_date).getFullYear() : "N/A"}
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>

            <div className="mb-6">
                <button
                    className={`mr-4 px-4 py-2 rounded ${activeTab === "cast" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("cast")}
                >
                    Cast ({cast.length})
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "crew" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("crew")}
                >
                    Crew ({crew.length})
                </button>
            </div>

            {activeTab === "cast" && (
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Name</th>
                            <th className="text-left py-2">Character</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cast.map((person) => (
                            <tr key={person.credit_id} className="border-b">
                                <td className="py-4 pr-4">
                                    <Link to={`/person/${person.id}`} className="flex items-center">
                                        {person.profile_path ? (
                                            <ProgressiveImage
                                                lowQualitySrc={`https://image.tmdb.org/t/p/w45${person.profile_path}`}
                                                highQualitySrc={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                                alt={person.name}
                                                className="w-16 h-24 object-cover rounded mr-4"
                                            />
                                        ) : (
                                            <div className="w-16 h-24 bg-gray-200 rounded mr-4 flex items-center justify-center">
                                                <span className="text-gray-400 text-center">
                                                    No Image
                                                </span>
                                            </div>
                                        )}
                                        <span className="font-semibold">{person.name}</span>
                                    </Link>
                                </td>
                                <td className="py-4">{person.character}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTab === "crew" &&
                departments.map((dept) => (
                    <div key={dept} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{dept}</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Name</th>
                                    <th className="text-left py-2">Job</th>
                                </tr>
                            </thead>
                            <tbody>
                                {crew
                                    .filter((c) => c.department === dept)
                                    .map((person) => (
                                        <tr key={person.credit_id} className="border-b">
                                            <td className="py-4 pr-4">
                                                <Link
                                                    to={`/person/${person.id}`}
                                                    className="flex items-center"
                                                >
                                                    {person.profile_path ? (
                                                        <ProgressiveImage
                                                            lowQualitySrc={`https://image.tmdb.org/t/p/w45${person.profile_path}`}
                                                            highQualitySrc={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                                            alt={person.name}
                                                            className="w-16 h-24 object-cover rounded mr-4"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-24 bg-gray-200 rounded mr-4 flex items-center justify-center">
                                                            <span className="text-gray-400 text-center">
                                                                No Image
                                                            </span>
                                                        </div>
                                                    )}
                                                    <span className="font-semibold">
                                                        {person.name}
                                                    </span>
                                                </Link>
                                            </td>
                                            <td className="py-4">{person.job}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ))}
        </div>
    );
};

export default MovieCreditsPage;
