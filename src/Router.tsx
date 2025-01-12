import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './views/HomePage'
import MoviesPage from './views/MoviesPage'
import ProfilePage from './views/ProfilePage'
import NotFoundPage from "./views/NotFoundPage"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
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
                path: 'profile',
                element: <ProfilePage />,
            },
        ],
    },
])

export default router