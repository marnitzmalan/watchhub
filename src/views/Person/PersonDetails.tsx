import React from "react";
import { useParams } from "react-router-dom";
import { usePersonDetails } from "@/hooks/usePersonDetails";
import KnownForMovies from "@/views/Person/KnownForMovies";
import { Iperson } from "@/types/Person";

interface PersonDetailsProps {
    personId: number;
}

const PersonDetails: React.FC<PersonDetailsProps> = () => {
    const { id } = useParams<{ id: string }>();
    const personId = parseInt(id as string, 10);

    const { data: person, isLoading, error } = usePersonDetails(personId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;
    if (!person) return <div>No person data available</div>;

    const typedPerson = person as Iperson;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto p-4 mt-4">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mt-8 md:mt-0">
                        <img
                            src={
                                typedPerson.profile_path
                                    ? `https://image.tmdb.org/t/p/w300${typedPerson.profile_path}`
                                    : "/placeholder.jpg"
                            }
                            alt={typedPerson.name}
                            className="rounded-md object-cover mr-6 mb-6"
                        />
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Known For</h3>
                                <p>{typedPerson.known_for_department}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Gender</h3>
                                <p>{typedPerson.gender === 1 ? "Female" : "Male"}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Birthday</h3>
                                <p>{typedPerson.birthday}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Place of Birth</h3>
                                <p>{typedPerson.place_of_birth}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-2/3 md:pr-8">
                        <h1 className="text-4xl font-bold mb-4">{typedPerson.name}</h1>
                        <p>{typedPerson.biography}</p>

                        <KnownForMovies personId={personId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;
