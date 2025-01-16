export interface ISearchCriteria {
    query: string;
    genres: number[];
    year?: number;
    rating?: number;
    keyword?: string;
    country?: string;
    runtime?: number;
    imdbRating?: number;
    cast?: string;
    language?: string;
    certificate?: string;
}
