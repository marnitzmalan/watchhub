import React, { useState } from "react";
import UserMenu from "@/components/navigation/UserMenu";
import { Link } from "react-router-dom";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import MovieLinks from "@/components/navigation/MovieLinks";
import SeriesLinks from "@/components/navigation/SeriesLinks";

interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
    const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
    const [isSeriesDropdownOpen, setIsSeriesDropdownOpen] = useState(false);

    const toggleMoviesDropdown = () => {
        setIsMoviesDropdownOpen(!isMoviesDropdownOpen);
    };

    const toggleSeriesDropdown = () => {
        setIsSeriesDropdownOpen(!isSeriesDropdownOpen);
    };

    return (
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <div>
                    <button
                        onClick={toggleMoviesDropdown}
                        className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                    >
                        Movies
                        {isMoviesDropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                    </button>
                    {isMoviesDropdownOpen && (
                        <div className="pl-4">
                            <MovieLinks onClick={toggleMenu} />
                        </div>
                    )}
                </div>
                <div>
                    <button
                        onClick={toggleSeriesDropdown}
                        className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                    >
                        Series
                        {isSeriesDropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                    </button>
                    {isSeriesDropdownOpen && (
                        <div className="pl-4">
                            <SeriesLinks onClick={toggleMenu} />
                        </div>
                    )}
                </div>
                <Link
                    to="/search"
                    onClick={toggleMenu}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Advanced Search
                </Link>
                <Link
                    to="/lists"
                    onClick={toggleMenu}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Lists
                </Link>
                <UserMenu
                    isMobile={true}
                    closeMenu={toggleMenu}
                    isDropdownOpen={false}
                    toggleDropdown={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>
        </div>
    );
};

export default MobileMenu;
