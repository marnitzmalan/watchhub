import { Link } from "react-router-dom";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    return (
        <Link to={to} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            {children}
        </Link>
    );
};

export default NavLink;