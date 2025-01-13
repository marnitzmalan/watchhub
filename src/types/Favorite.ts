export interface IFavorite {
    id: number;
    movie_id: number;
    user_id: string;
    title: string;
    poster_path: string;
    release_date?: string;
    popularity?: number;
    overview?: string;
    vote_average?: number;
    genres?: { id: number; name: string }[];
}