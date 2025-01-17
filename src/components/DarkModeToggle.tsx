import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { MdOutlineWbSunny, MdDarkMode } from "react-icons/md";

const DarkModeToggle: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDarkMode ? <MdOutlineWbSunny size={18} /> : <MdDarkMode size={18} />}
        </button>
    );
};

export default DarkModeToggle;
