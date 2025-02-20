import AppButton from "@/components/ui/AppButton.tsx";
import ProgressiveImage from "@/components/ProgressiveImage";
import TrailerModal from "@/components/TrailerModal";
import React, { useState } from "react";
import { IGenre } from "@/types/Genre";
import { MdOutlineBookmark, MdRemoveRedEye, MdPlayArrow } from "react-icons/md";

interface SeriesDetailContentProps {
    series: any; // Replace 'any' with your series type
    backdropPath: string | null;
    posterSrc: string | null;
    lowQualityPosterSrc: string | null;
    creator: { name: string } | undefined;
    isAuthenticated: boolean;
    handleToggleFavourite: () => void;
    handleToggleWatched: () => void;
    isFavourite: boolean;
    isWatched: boolean;
    trailerKey: string | undefined;
}

const SeriesDetailContent: React.FC<SeriesDetailContentProps> = ({
    series,
    backdropPath,
    posterSrc,
    lowQualityPosterSrc,
    isAuthenticated,
    handleToggleFavourite,
    handleToggleWatched,
    isFavourite,
    isWatched,
}) => {
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

    const openTrailerModal = () => setIsTrailerModalOpen(true);
    const closeTrailerModal = () => setIsTrailerModalOpen(false);

    return (
        <div className="relative">
            <div
                className="w-full h-[225px] sm:h-[450px] md:h-[625px] bg-cover bg-top relative"
                style={{ backgroundImage: `url(${backdropPath})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 md:bg-opacity-85"></div>
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 -mt-[225px] sm:-mt-[450px] md:-mt-[625px] pt-6 sm:pt-10 md:pt-12 pb-12">
                <div className="flex flex-col items-center md:flex-row gap-6 md:gap-8">
                    <div className="w-full sm:w-[250px] md:w-[350px] flex justify-center md:justify-start">
                        <div className="aspect-[2/3] w-28 sm:w-full">
                            {posterSrc ? (
                                <ProgressiveImage
                                    lowQualitySrc={lowQualityPosterSrc ?? ""}
                                    highQualitySrc={posterSrc}
                                    alt={series.name}
                                    className="w-28 sm:w-full object-cover rounded-lg shadow-md"
                                />
                            ) : (
                                <div className="w-28 sm:w-full bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 text-gray-900 md:text-white pt-5 sm:pt-10 md:pt-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                            {series.name}
                        </h1>

                        <div className="mb-6 flex flex-wrap items-center text-sm sm:text-base text-gray-600 md:text-gray-300">
                            <span>{new Date(series.first_air_date).getFullYear()}</span>
                            <span className="mx-2">•</span>
                            {series.genres.map((genre: IGenre, index: number) => (
                                <React.Fragment key={genre.id}>
                                    {index > 0 && <span className="mx-1">,</span>}
                                    <span>{genre.name}</span>
                                </React.Fragment>
                            ))}
                            <span className="mx-2">•</span>
                            <span>
                                {series.number_of_seasons} Season
                                {series.number_of_seasons !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {isAuthenticated && (
                            <div className="mb-6 flex flex-col sm:flex-row gap-2">
                                {/*{trailerKey && (*/}
                                {/*    <AppButton*/}
                                {/*        onClick={openTrailerModal}*/}
                                {/*        icon={<MdPlayArrow size={20} />}*/}
                                {/*        title="Watch Trailer"*/}
                                {/*        className="py-2 px-4 border text-base*/}
                                {/*        rounded-full font-bold*/}
                                {/*        transition-colors duration-200*/}
                                {/*        border-gray-800 text-gray-800*/}
                                {/*        hover:bg-gray-800 hover:text-white*/}
                                {/*        dark:border-white dark:text-white*/}
                                {/*        dark:hover:bg-white dark:hover:text-gray-800*/}
                                {/*        md:border-gray-100 md:text-gray-100*/}
                                {/*        md:hover:bg-gray-800 md:hover:text-white*/}
                                {/*        md:dark:border-gray-800 md:dark:text-gray-800*/}
                                {/*        md:dark:hover:bg-gray-800 md:dark:hover:text-white"*/}
                                {/*    >*/}
                                {/*        Trailer*/}
                                {/*    </AppButton>*/}
                                {/*)}*/}
                                <AppButton
                                    onClick={handleToggleFavourite}
                                    icon={
                                        <MdOutlineBookmark
                                            size={24}
                                            className={`${isFavourite ? "text-purple-500" : ""}`}
                                        />
                                    }
                                    title={
                                        isFavourite ? "Remove from Favorites" : "Add to Favorites"
                                    }
                                    variant="ghostSecondary"
                                    className="w-full p-2 hover:bg-opacity-20 sm:w-auto ml-3"
                                >
                                    {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
                                </AppButton>
                                <AppButton
                                    onClick={handleToggleWatched}
                                    icon={
                                        <MdRemoveRedEye
                                            size={24}
                                            className={`${isWatched ? "text-green-500" : ""}`}
                                        />
                                    }
                                    title={isWatched ? "Mark as Unwatched" : "Mark as Watched"}
                                    variant="ghostSecondary"
                                    className="w-full p-2 hover:bg-opacity-20 sm:w-auto ml-3"
                                >
                                    {isWatched ? "Mark as Unwatched" : "Mark as Watched"}
                                </AppButton>
                            </div>
                        )}

                        <p className="text-sm sm:text-base mb-4">{series.overview}</p>

                        {/*{creator && (*/}
                        {/*    <p className="text-sm sm:text-base">*/}
                        {/*        <span className="font-semibold">Creator:</span> {creator.name}*/}
                        {/*    </p>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>

            {/*{trailerKey && (*/}
            {/*    <TrailerModal*/}
            {/*        isOpen={isTrailerModalOpen}*/}
            {/*        onClose={closeTrailerModal}*/}
            {/*        videoKey={trailerKey}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
};

export default SeriesDetailContent;
