import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => {
    return (
        <Link
            to={to}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export default NavLink;
