import React from "react";
import { usePopularSeries } from "@/hooks/usePopularSeries";
import { useFavourite } from "@/hooks/useFavourite";
import { useAuth } from "@/hooks/useAuth";
import { ISeries } from "@/types/Series.ts";
import SeriesCard from "@/components/SeriesCard.tsx";

const PopularSeries: React.FC = () => {
    const { data: series, isLoading, error } = usePopularSeries();
    const { isFavourite, toggleFavourite } = useFavourite();
    const { user } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex-1 px-4">
                <h2 className="text-2xl font-bold mb-6 relative inline-block">
                    Popular Series
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {series?.map((seriesItem: ISeries) => (
                        <SeriesCard
                            key={seriesItem.id}
                            series={seriesItem}
                            isAuthenticated={!!user}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularSeries;
