export interface IReview {
    id: string;
    author: string;
    content: string;
    created_at: string;
    updated_at?: string;
    author_details?: {
        name: string;
        username: string;
        avatar_path?: string;
        rating?: number;
    };
    url?: string;
}
