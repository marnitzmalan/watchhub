import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import SearchBar from "@/components/navigation/SearchBar.tsx";
import UserMenu from "@/components/navigation/UserMenu";
import MobileMenu from "@/components/navigation/MobileMenu";
import MobileSearchBar from "@/components/navigation/MobileSearchBar";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-white font-bold text-xl">WatchHub</Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/movies"
                                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</Link>
                                <Link to="/watchlist"
                                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Watchlist</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center px-2 ml-4">
                        <SearchBar/>
                    </div>
                    <div className="hidden md:block">
                        <UserMenu/>
                    </div>
                    <div className="md:hidden flex items-center">
                        <MobileSearchBar/>
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <MdClose className="block h-6 w-6"/> : <MdMenu className="block h-6 w-6"/>}
                        </button>
                    </div>
                </div>
            </div>
            <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </nav>
    );
};

export default Navbar;