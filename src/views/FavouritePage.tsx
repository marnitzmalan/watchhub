import React from "react";
import { useFavourite } from "@/hooks/useFavourite";
import GridLayout from "@/components/GridLayout.tsx";

const FavouritesPage: React.FC = () => {
    const { favourite, isLoading, toggleFavourite, isFavourite } = useFavourite();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Favourites</h1>
            <GridLayout
                movies={favourite || []}
                onToggleFavourite={toggleFavourite}
                isFavourite={isFavourite}
            />
        </div>
    );
};

export default FavouritesPage;
