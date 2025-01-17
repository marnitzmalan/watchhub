import React from "react";

interface SectionHeaderProps {
    title: string;
}

const AppHeader: React.FC<SectionHeaderProps> = ({ title }) => {
    return (
        <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl font-bold relative inline-block">
                {title}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
            </h2>
        </div>
    );
};

export default AppHeader;
