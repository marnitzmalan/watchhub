import React from "react";
// import { usePopularPeople } from "@/api/people.ts";
// import { Link } from "react-router-dom";
// import ProgressiveImage from "@/components/ProgressiveImage.tsx";
//
// interface ICelebrity {
//     id: number;
//     name: string;
//     profile_path: string | null;
// }

const PopularCelebrities: React.FC = () => {
    // const { data, isLoading, error } = usePopularPeople(1, "en"); // Fetch page 1, English language
    //
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {(error as Error).message}</div>;
    // if (!data || !data.results) return <div>No data available</div>;
    //
    // const celebrities: ICelebrity[] = data.results.slice(0, 16);

    return (
        <div>
            <p>Popular People</p>
        </div>
        // <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 md:gap-8">
        //     {celebrities.map((celebrity) => (
        //         <Link
        //             to={`/person/${celebrity.id}`}
        //             key={celebrity.id}
        //             className="group text-center"
        //         >
        //             <div className="aspect-square rounded-full overflow-hidden mx-auto mb-2 relative">
        //                 {celebrity.profile_path ? (
        //                     <ProgressiveImage
        //                         lowQualitySrc={`https://image.tmdb.org/t/p/w45${celebrity.profile_path}`}
        //                         highQualitySrc={`https://image.tmdb.org/t/p/w500${celebrity.profile_path}`}
        //                         alt={celebrity.name}
        //                         className="object-cover w-full h-full"
        //                     />
        //                 ) : (
        //                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        //                         <span className="text-gray-400">No Image</span>
        //                     </div>
        //                 )}
        //                 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out rounded-full"></div>
        //             </div>
        //             <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
        //                 {celebrity.name}
        //             </h3>
        //         </Link>
        //     ))}
        // </div>
    );
};

export default PopularCelebrities;
