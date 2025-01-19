import { IMovie } from "./Movie";

export interface IFavourite extends Pick<IMovie, "title" | "poster_path"> {
    id: number;
    movie_id: number;
    user_id: string;
    added_at: string;
    release_date?: string;
    vote_average?: number;
}
