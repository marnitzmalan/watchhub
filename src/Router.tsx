import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./views/HomePage";
import PopularMoviesPage from "./views/movies/PopularMoviesPage.tsx";
import MovieDetailPage from "./views/MovieDetailPage";
import AdvanceSearchPage from "./views/AdvanceSearchPage.tsx";
import WatchlistPage from "./views/WatchlistPage";
import ProfilePage from "./views/ProfilePage";
import NotFoundPage from "./views/NotFoundPage";
import LoginPage from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthCallback from "./components/AuthCallback";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "movies/popular", element: <PopularMoviesPage /> },
            { path: "movie/:id", element: <MovieDetailPage /> },
            { path: "search", element: <AdvanceSearchPage /> },
            { path: "watchlist", element: <WatchlistPage /> },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            { path: "login", element: <LoginPage /> },
            { path: "auth/callback", element: <AuthCallback /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;
