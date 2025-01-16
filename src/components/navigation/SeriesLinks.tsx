import React from "react";
import { Link } from "react-router-dom";

interface SeriesLinksProps {
    onClick?: () => void;
    className?: string;
}

const SeriesLinks: React.FC<SeriesLinksProps> = ({ onClick, className }) => {
    const links = [
        { to: "/series/popular", text: "Popular Series" },
        // { to: "/series/top-rated", text: "Top Rated Series" },
        // { to: "/series/on-the-air", text: "Currently Airing" },
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClick}
                    className={
                        className ||
                        "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    }
                >
                    {link.text}
                </Link>
            ))}
        </>
    );
};

export default SeriesLinks;
