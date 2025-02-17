import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "@/api/apiErrors";

/**
 * A custom hook that wraps react-query's useQuery hook with some default options.
 *
 * @template T The type of data returned by the query
 * @param {unknown[]} queryKey An array that uniquely identifies the query
 * @param {() => Promise<T>} queryFn A function that returns a promise which resolves to the query data
 * @param {Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">} [options] Additional options to pass to useQuery
 * @returns {UseQueryResult<T, ApiError>} The result of the useQuery hook
 */
export const useApiQuery = <T>(
    queryKey: unknown[],
    queryFn: () => Promise<T>,
    options?: Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">
): UseQueryResult<T, ApiError> => {
    return useQuery<T, ApiError>({
        queryKey,
        queryFn,
        ...options,
    });
};
