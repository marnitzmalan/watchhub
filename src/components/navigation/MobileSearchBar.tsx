import React, { useState, useRef, useEffect } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import SearchBar from "@/components/navigation/SearchBar";

const MobileSearchBar: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
    };

    useEffect(() => {
        if (isSearchOpen && searchContainerRef.current) {
            const inputElement = searchContainerRef.current.querySelector("input");
            if (inputElement) {
                inputElement.focus();
            }
        }
    }, [isSearchOpen]);

    return (
        <div className="md:hidden">
            {!isSearchOpen ? (
                <button
                    onClick={toggleSearch}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                    <MdSearch size={24} />
                </button>
            ) : (
                <div className="fixed inset-0 z-50 bg-gray-800 flex items-center h-16">
                    <div className="w-full px-4" ref={searchContainerRef}>
                        <div className="flex items-center">
                            <div className="flex-grow">
                                <SearchBar onMovieSelect={closeSearch} />
                            </div>
                            <button
                                onClick={toggleSearch}
                                className="ml-2 text-gray-300 hover:text-white"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileSearchBar;
