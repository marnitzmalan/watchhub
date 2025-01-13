import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-6">Favorite Movies</h1>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">You need to be logged in to see your favorites.</p>
                    <p>Please <Link to="/login" className="text-blue-500 hover:text-blue-700 underline">log in</Link> to view and manage your favorite movies.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Favorite Movies</h1>
            {/* Add your favorites list here */}
        </div>
    );
};

export default FavoritesPage;