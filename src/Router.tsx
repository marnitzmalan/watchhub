import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./views/HomePage";
import PopularMoviesPage from "@/views/Movies/PopularMoviesPage.tsx";
import MovieDetailPage from "./views/Movies/MovieDetailPage.tsx";
import MovieCreditsPage from "./views/MovieCreditsPage";
import PopularSeriesPage from "./views/Series/PopularSeriesPage";
import SeriesDetailPage from "./views/Series/SeriesDetailPage.tsx";
import PersonDetailPage from "./views/PersonDetailPage.tsx";
import AdvanceSearchPage from "./views/AdvanceSearchPage.tsx";
import ListsPage from "./views/ListsPage";
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
            { path: "movie/:id/credits", element: <MovieCreditsPage /> },
            { path: "series/popular", element: <PopularSeriesPage /> },
            { path: "series/:id", element: <SeriesDetailPage /> },
            { path: "person/:id", element: <PersonDetailPage /> },
            { path: "search", element: <AdvanceSearchPage /> },
            { path: "lists", element: <ListsPage /> },
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
