import { useApiQuery } from "@/api";

export const useSearchMovies = (query: string, page = 1) =>
    useApiQuery("/search/movie", { query, page, sort_by: "popularity.desc" });
