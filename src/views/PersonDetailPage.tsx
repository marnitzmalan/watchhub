import React from "react";
import { useParams } from "react-router-dom";
import PersonDetails from "@/views/Person/PersonDetails";

const PersonDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const personId = parseInt(id ?? "", 10);

    if (isNaN(personId)) {
        return <div>Invalid person ID</div>;
    }

    return (
        <div>
            <PersonDetails personId={personId} />
        </div>
    );
};

export default PersonDetailPage;
