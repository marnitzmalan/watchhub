import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useMovieDetails } from './movies';
import { useApiQuery } from './index';

// Mock the useApiQuery hook
vi.mock('./index', () => ({
    useApiQuery: vi.fn(),
}));

// Mock the supabase client
vi.mock('/supabase/client', () => ({
    supabase: {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        range: vi.fn().mockReturnThis(),
    },
}));

// Define a type for the mocked useApiQuery function
type MockUseApiQuery = ReturnType<typeof vi.fn>;

describe('useMovieDetails', () => {
    it('should call useApiQuery with the correct parameters', () => {
        const mockMovieId = 123;
        const mockMovieData = { id: mockMovieId, title: 'Test Movie' };

        // Mock the implementation of useApiQuery
        (useApiQuery as MockUseApiQuery).mockReturnValue({
            data: mockMovieData,
            isLoading: false,
            error: null,
        });

        // Render the hook
        const { result } = renderHook(() => useMovieDetails(mockMovieId));

        // Check if useApiQuery was called with the correct parameters
        expect(useApiQuery).toHaveBeenCalledWith(`/movie/${mockMovieId}`);

        // Check if the returned data is correct
        expect(result.current.data).toEqual(mockMovieData);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });
});