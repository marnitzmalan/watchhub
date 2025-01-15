import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import UserMenu from "@/components/navigation/UserMenu";
import MobileMenu from "@/components/navigation/MobileMenu";
import NavLink from "@/components/navigation/NavLink";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="text-white font-bold text-xl mr-4">
                            WatchHub
                        </Link>
                        <div className="hidden md:block">
                            <NavLink to="/movies">Movies</NavLink>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center px-2 ml-4">
                        <SearchBar/>
                    </div>
                    <div className="hidden md:flex items-center">
                        <NavLink to="/watchlist">Watchlist</NavLink>
                        <UserMenu/>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <MdClose className="block h-6 w-6" aria-hidden="true"/>
                            ) : (
                                <MdMenu className="block h-6 w-6" aria-hidden="true"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <MobileMenu isOpen={isMobileMenuOpen}/>
        </nav>
    )
}

export default Navbar;