import React from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle, MdArrowDropDown, MdLogout } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth.ts";
import { supabase } from "@/supabase/client.ts";

interface UserMenuProps {
    isMobile?: boolean;
    closeMenu?: () => void;
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
    isMobile = false,
    closeMenu,
    isDropdownOpen,
    toggleDropdown,
}) => {
    const { user } = useAuth();

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            if (closeMenu) closeMenu();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleLinkClick = () => {
        if (closeMenu) closeMenu();
    };

    if (!user) {
        return (
            <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block mr-2 px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLinkClick}
            >
                <span className="flex items-center">
                    <MdAccountCircle className="mr-2" size={20} />
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
                    <span className="flex items-center">Profile</span>
                </Link>
                <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                    <span className="flex items-center">
                        <MdLogout className="mr-3" size={20} />
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
                <span className="flex items-center">{user?.email || "User"}</span>
                <MdArrowDropDown className="ml-1 h-5 w-5" />
            </button>
            {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLinkClick}
                    >
                        Your Profile
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
