import { IMovie } from "@/types/Movie";

export interface ISearchMoviesResponse {
    page: number;
    results: IMovie[];
    total_results: number;
    total_pages: number;
}
