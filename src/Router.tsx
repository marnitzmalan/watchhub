import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailPage from './views/MovieDetailPage';
import FavoritesPage from './views/FavoritesPage';
import ProfilePage from './views/ProfilePage';
import NotFoundPage from './views/NotFoundPage';
import LoginPage from './views/LoginPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'movies', element: <MoviesPage /> },
            { path: 'movie/:id', element: <MovieDetailPage /> },
            { path: 'favorites', element: <FavoritesPage /> },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            },
            { path: 'login', element: <LoginPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);

export default router;