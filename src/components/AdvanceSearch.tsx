import React, { useState } from 'react';
import { ISearchCriteria } from '@/types/SearchCriteria';

interface AdvanceSearchProps {
    onSearch: (criteria: ISearchCriteria) => void;
}

const AdvanceSearch: React.FC<AdvanceSearchProps> = ({ onSearch }) => {
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState<number | ''>('');
    const [rating, setRating] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const criteria: ISearchCriteria = {};
        if (genre) criteria.genre = genre;
        if (year) criteria.year = year;
        if (rating) criteria.rating = rating;
        onSearch(criteria);
    };

    return (
        <div className="fixed top-16 left-0 h-full w-64 bg-gray-700 shadow-md text-white overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-4">
                <h2 className="text-lg font-bold mb-4">Advanced Search</h2>
                <div className="mb-4">
                    <label htmlFor="genre" className="block text-sm font-medium">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="mt-1 block w-full bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-medium">Year</label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : '')}
                        className="mt-1 block w-full bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-medium">Minimum Rating</label>
                    <input
                        type="number"
                        id="rating"
                        min="0"
                        max="10"
                        step="0.1"
                        value={rating}
                        onChange={(e) => setRating(e.target.value ? parseFloat(e.target.value) : '')}
                        className="mt-1 block w-full bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 transition duration-300">
                    Search
                </button>
            </form>
        </div>
    );
};

export default AdvanceSearch;