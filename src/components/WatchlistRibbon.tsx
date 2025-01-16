import React from "react";
import { MdAdd, MdCheck } from "react-icons/md";

interface WatchlistRibbonProps {
    isInWatchlist: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const WatchlistRibbon: React.FC<WatchlistRibbonProps> = ({ isInWatchlist, onClick }) => {
    return (
        <div
            className="watchlist-ribbon cursor-pointer w-full h-0 pb-[150%] relative"
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
            <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 32 48"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
            >
                <polygon
                    className="watchlist-ribbon__bg-ribbon"
                    fill={isInWatchlist ? "#8B5CF6" : "rgba(128, 128, 128, 0.7)"}
                    points="32 0 0 0 0 45 16 37 32 45"
                ></polygon>
            </svg>
            <div className="watchlist-ribbon__icon absolute top-[20%] left-0 w-full flex justify-center items-center">
                {isInWatchlist ? (
                    <MdCheck className="w-1/2 h-1/2" color="#ffffff" />
                ) : (
                    <MdAdd className="w-1/2 h-1/2" color="#ffffff" />
                )}
            </div>
        </div>
    );
};

export default WatchlistRibbon;
