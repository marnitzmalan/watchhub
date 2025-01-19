import { IMovie } from "@/types/Movie";

export interface IWatched extends Pick<IMovie, "title" | "poster_path"> {
    id: number;
    movie_id: number;
    user_id: string;
    watched_at?: string;
    release_date?: string;
    vote_average?: number;
}
