import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ApiError, createApiError } from './apiErrors';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchFromApi = async <T>(endpoint: string, params?: Record<string, unknown>): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw createApiError(response.status, `API error: ${response.statusText}`);
    }
    return response.json();
};

export const useApiQuery = <T>(
    endpoint: string,
    params?: Record<string, unknown>,
    options?: Omit<UseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<T, ApiError>({
        queryKey: [endpoint, params],
        queryFn: () => fetchFromApi<T>(endpoint, params),
        ...options
    });
};

export { ApiError, ApiErrorType } from './apiErrors';