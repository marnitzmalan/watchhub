import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './views/HomePage'
import MoviesPage from './views/MoviesPage'
import MovieDetailPage from './views/MovieDetailPage'
import NotFoundPage from './views/NotFoundPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'movies',
                element: <MoviesPage />,
            },
            {
                path: 'movie/:id',
                element: <MovieDetailPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
])

export default router