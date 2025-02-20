import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { useWatched } from "@/hooks/useWatched";
import GridLayout from "@/components/GridLayout.tsx";

const mapFavouriteToMovie = (favourite: IFavourite): IMovie => ({
    id: favourite.movie_id,
    title: favourite.title,
    poster_path: favourite.poster_path,
    // Add other necessary fields from IMovie
});

const mapWatchedToMovie = (watched: IWatched): IMovie => ({
    id: watched.movie_id,
    title: watched.title,
    poster_path: watched.poster_path,
    // Add other necessary fields from IMovie
});

const ListPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { favourite, toggleFavourite, isFavourite } = useFavourite();
    const { watched, toggleWatched, isWatched } = useWatched();
    const [activeTab, setActiveTab] = useState<"favorites" | "watched">("favorites");

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please log in to view your lists</h2>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Log In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Lists</h1>
            <div className="mb-6">
                <button
                    className={`mr-4 px-4 py-2 rounded-full ${activeTab === "favorites" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("favorites")}
                >
                    Favorites
                </button>
                <button
                    className={`mr-4 px-4 py-2 rounded-full ${activeTab === "watched" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("watched")}
                >
                    Watched
                </button>
            </div>
            {activeTab === "favorites" && (
                <GridLayout
                    movies={(favourite ?? []).map(mapFavouriteToMovie)}
                    onToggleFavourite={toggleFavourite}
                    isFavourite={isFavourite}
                    listType="favorites"
                />
            )}
            {activeTab === "watched" && (
                <GridLayout
                    movies={(watched ?? []).map(mapWatchedToMovie)}
                    onToggleWatched={toggleWatched}
                    isWatched={isWatched}
                    listType="watched"
                />
            )}
        </div>
    );
};

export default ListPage;
