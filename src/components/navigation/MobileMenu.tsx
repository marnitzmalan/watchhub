import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "@/components/navigation/UserMenu";

interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
    return (
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/movies" onClick={toggleMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Movies</Link>
                <Link to="/watchlist" onClick={toggleMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Watchlist</Link>
                <UserMenu isMobile={true} closeMenu={toggleMenu} />
            </div>
        </div>
    );
};

export default MobileMenu;