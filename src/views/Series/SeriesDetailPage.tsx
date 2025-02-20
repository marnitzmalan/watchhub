import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { useWatched } from "@/hooks/useWatched";
import { useSeriesDetails } from "@/hooks/series/useSeriesDetails";
import SeriesDetailContent from "@/views/SeriesDetail/SeriesDetailContent";
// import TopCast from "@/views/SeriesDetail/TopCast";
// import AdditionalInfo from "@/views/SeriesDetail/AdditionalInfo";
// import SeriesReviews from "@/components/SeriesReviews";
// import RecommendedSeries from "@/components/RecommendedSeries";

const SeriesDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const seriesId = parseInt(id as string, 10);
    const { data: seriesData, isLoading, error } = useSeriesDetails({ seriesId });
    const { isAuthenticated } = useAuth();
    const { isFavourite, toggleFavourite } = useFavourite();
    const { isWatched, toggleWatched } = useWatched();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    if (!seriesData) return <div>No series data available</div>;

    const { series } = seriesData;

    const backdropPath = series.backdrop_path
        ? `https://image.tmdb.org/t/p/original${series.backdrop_path}`
        : null;
    const posterSrc = series.poster_path
        ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
        : null;
    const lowQualityPosterSrc = series.poster_path
        ? `https://image.tmdb.org/t/p/w92${series.poster_path}`
        : null;

    const handleToggleFavourite = () => {
        toggleFavourite(series);
    };

    const handleToggleWatched = () => {
        toggleWatched(series);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <SeriesDetailContent
                series={series}
                backdropPath={backdropPath}
                posterSrc={posterSrc}
                lowQualityPosterSrc={lowQualityPosterSrc}
                isAuthenticated={isAuthenticated}
                isFavourite={isFavourite(series.id)}
                isWatched={isWatched(series.id)}
                handleToggleFavourite={handleToggleFavourite}
                handleToggleWatched={handleToggleWatched}
            />

            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="md:w-2/3 md:pr-8">
                        {/*<div className="mt-8">*/}
                        {/*    <TopCast cast={topCast} seriesId={seriesId} />*/}
                        {/*</div>*/}

                        {/*<div className="mt-8">*/}
                        {/*    <h2 className="text-2xl font-bold mb-4">More Like This</h2>*/}
                        {/*    <RecommendedSeries seriesId={series.id} />*/}
                        {/*</div>*/}

                        {/*<div className="mt-8">*/}
                        {/*    <h2 className="text-2xl font-bold mb-4">User Reviews</h2>*/}
                        {/*    <SeriesReviews seriesId={series.id} />*/}
                        {/*</div>*/}
                    </div>

                    {/* Right Side */}
                    {/*<div className="md:w-1/3 mt-8">*/}
                    {/*    <AdditionalInfo series={series} />*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default SeriesDetailPage;
