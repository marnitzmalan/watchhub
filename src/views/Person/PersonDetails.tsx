import React from "react";
import { useParams } from "react-router-dom";
import { usePersonDetails } from "@/hooks/usePersonDetails";
import PersonHeader from "@/views/Person/PersonHeader";
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
            <PersonHeader person={typedPerson} />
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/3 md:pr-8">
                        <h2 className="text-2xl font-bold mb-4">Biography</h2>
                        <p>{typedPerson.biography}</p>

                        <KnownForMovies personId={personId} />
                    </div>
                    <div className="md:w-1/3 mt-8 md:mt-0">
                        <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
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
                </div>
            </div>
        </div>
    );
};

export default PersonDetails;