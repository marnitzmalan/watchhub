import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar.tsx";
import UserMenu from "@/components/navigation/UserMenu";

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/movies" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Movies</Link>
                <Link to="/watchlist" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Watchlist</Link>
                <UserMenu isMobile={true} />
            </div>
            <div className="px-2 pt-2 pb-3">
                <SearchBar />
            </div>
        </div>
    );
};

export default MobileMenu;