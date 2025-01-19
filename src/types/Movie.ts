export interface IMovie {
    id: number;
    movie_id?: number;
    title: string;
    poster_path: string;
    release_date: string;
    popularity: number;
    overview: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    runtime: number;
    tagline: string;
}
