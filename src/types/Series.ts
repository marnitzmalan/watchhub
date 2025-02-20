export interface ISeries {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    overview: string;
    genres: { id: number; name: string }[];
}
