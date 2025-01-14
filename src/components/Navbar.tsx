import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/supabase/client';
import { MdArrowDropDown } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, userProfile } = useAuth();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
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
                            <Link to="/movies" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center px-2 ml-4">
                        <SearchBar />
                    </div>
                    <div className="hidden md:flex items-center">
                        <Link to="/watchlist" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Watchlist</Link>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                                >
                                    <span className="flex items-center">
                                        <MdAccountCircle className="mr-2 h-5 w-5"/>
                                        {userProfile?.username || user.email}
                                    </span>
                                    <MdArrowDropDown className={`ml-1 h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}/>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                    <Link to="/profile"
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                        <button onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign
                                            Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                <span className="flex items-center">
                                    <MdAccountCircle className="mr-2 h-5 w-5"/>
                                    Sign In
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className="md:hidden">
                    <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/movies" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Movies</Link>
                    <Link to="/watchlist" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">watchlist</Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                            <button onClick={handleSignOut}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Sign
                                Out
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Sign In</Link>
                    )}
                </div>
                <div className="px-2 pt-2 pb-3">
                    <SearchBar/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;