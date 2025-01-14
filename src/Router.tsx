import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./views/HomePage";
import MoviesPage from "./views/MoviesPage";
import MovieDetailPage from "./views/MovieDetailPage";
import WatchlistPage from "./views/WatchlistPage";
import ProfilePage from "./views/ProfilePage";
import NotFoundPage from "./views/NotFoundPage";
import LoginPage from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "movies", element: <MoviesPage /> },
            { path: "movie/:id", element: <MovieDetailPage /> },
            { path: "watchlist", element: <WatchlistPage /> },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            },
            { path: "login", element: <LoginPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

export default router;