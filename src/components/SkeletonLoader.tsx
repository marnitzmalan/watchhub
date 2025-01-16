import React from "react";

const SkeletonLoader: React.FC = () => (
    <div className="flex flex-col h-full">
        <div className="bg-gray-300 rounded-lg overflow-hidden transition-all duration-300 ease-in-out flex-grow">
            <div className="overflow-hidden h-full pb-[150%] relative">
                <div className="absolute inset-0 bg-gray-400 animate-pulse"></div>
            </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
            <div className="flex-grow">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
    </div>
);

export default SkeletonLoader;
