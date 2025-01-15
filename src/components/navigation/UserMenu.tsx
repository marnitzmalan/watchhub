import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle, MdArrowDropDown } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth.ts";
import { supabase } from "@/supabase/client.ts";

interface UserMenuProps {
    isMobile?: boolean;
    closeMenu?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isMobile = false, closeMenu }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, userProfile } = useAuth();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        if (closeMenu) closeMenu();
    };

    const handleLinkClick = () => {
        if (closeMenu) closeMenu();
    };

    if (!user) {
        return (
            <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLinkClick}
            >
                <span className="flex items-center">
                    <MdAccountCircle className="mr-3" size={20} />
                    Sign In
                </span>
            </Link>
        );
    }

    if (isMobile) {
        return (
            <>
                <Link
                    to="/profile"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={handleLinkClick}
                >
                    <span className="flex items-center">
                        <MdAccountCircle className="mr-3" size={20} />
                        Profile
                    </span>
                </Link>
                <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                    <span className="flex items-center">
                        <MdAccountCircle className="mr-3" size={20} />
                        Sign Out
                    </span>
                </button>
            </>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
            >
                <span className="flex items-center">
                    <MdAccountCircle className="mr-2 h-5 w-5"/>
                    {userProfile?.username || user.email}
                </span>
                <MdArrowDropDown className={`ml-1 h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? "transform rotate-180" : ""}`}/>
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;