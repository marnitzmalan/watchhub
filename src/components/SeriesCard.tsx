import React from "react";
import { MdMoreVert, MdRemoveRedEye, MdOutlineBookmark } from "react-icons/md";
import ProgressiveImage from "./ProgressiveImage";
import { useWatched } from "@/hooks/useWatched.ts";
import { Menu } from "@headlessui/react";
import { useFavourite } from "@/hooks/useFavourite.ts";
import { Link } from "react-router-dom";
import { ISeries } from "@/types/Series";

interface SeriesCardProps {
    series: ISeries;
    isAuthenticated: boolean;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series, isAuthenticated }) => {
    const lowQualityPosterSrc = series.poster_path
        ? `https://image.tmdb.org/t/p/w92${series.poster_path}`
        : "";
    const highQualityPosterSrc = series.poster_path
        ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
        : "";

    const { isWatched, toggleWatched } = useWatched();
    const { isFavourite, toggleFavourite } = useFavourite();

    // const handleToggleWatched = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     toggleWatched(series);
    // };
    //
    // const handleToggleFavourite = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     toggleFavourite(series);
    // };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl flex-grow relative">
                <Link to={`/series/${series.id}`} className="block relative group h-full">
                    <div className="overflow-hidden h-full pb-[150%] relative">
                        <ProgressiveImage
                            lowQualitySrc={lowQualityPosterSrc}
                            highQualitySrc={highQualityPosterSrc}
                            alt={series.name}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
                        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 transition-all duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex flex-col items-center">
                                {series.vote_average !== null && (
                                    <div className="bg-yellow-400 text-black font-bold rounded-full px-3 py-1 mb-3">
                                        ★ {series.vote_average.toFixed(1)}
                                    </div>
                                )}
                                <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
                {isAuthenticated && (
                    <div className="absolute top-0 right-0 m-2">
                        <Menu as="div" className="relative inline-block text-left">
                            <Menu.Button className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-100 transition-colors duration-200">
                                <MdMoreVert size={24} />
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 whitespace-nowrap">
                                    {/*<Menu.Item>*/}
                                    {/*    {({ active }) => (*/}
                                    {/*        <button*/}
                                    {/*            className={`${*/}
                                    {/*                active ? "bg-gray-100" : ""*/}
                                    {/*            } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700`}*/}
                                    {/*            onClick={handleToggleWatched}*/}
                                    {/*        >*/}
                                    {/*            <span*/}
                                    {/*                className={`flex items-center ${isWatched(series.id) ? "text-green-500" : ""}`}*/}
                                    {/*            >*/}
                                    {/*                <MdRemoveRedEye*/}
                                    {/*                    className="mr-2 h-5 w-5"*/}
                                    {/*                    aria-hidden="true"*/}
                                    {/*                />*/}
                                    {/*                Watched*/}
                                    {/*            </span>*/}
                                    {/*        </button>*/}
                                    {/*    )}*/}
                                    {/*</Menu.Item>*/}
                                    {/*<Menu.Item>*/}
                                    {/*    {({ active }) => (*/}
                                    {/*        <button*/}
                                    {/*            className={`${*/}
                                    {/*                active ? "bg-gray-100" : ""*/}
                                    {/*            } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700`}*/}
                                    {/*            onClick={handleToggleFavourite}*/}
                                    {/*        >*/}
                                    {/*            <span*/}
                                    {/*                className={`flex items-center ${isFavourite(series.id) ? "text-purple-500" : ""}`}*/}
                                    {/*            >*/}
                                    {/*                <MdOutlineBookmark*/}
                                    {/*                    className="mr-2 h-5 w-5"*/}
                                    {/*                    aria-hidden="true"*/}
                                    {/*                />*/}
                                    {/*                Favorite*/}
                                    {/*            </span>*/}
                                    {/*        </button>*/}
                                    {/*    )}*/}
                                    {/*</Menu.Item>*/}
                                </div>
                            </Menu.Items>
                        </Menu>
                    </div>
                )}
            </div>
            <div className="mt-2">
                <h2 className="text-sm font-semibold truncate text-gray-900" title={series.name}>
                    {series.name}
                </h2>
                <p className="text-sm text-gray-600">
                    {new Date(series.first_air_date).getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default SeriesCard;
