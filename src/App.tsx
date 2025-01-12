import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <Outlet />
            </main>
        </React.Fragment>
    )
}

export default App