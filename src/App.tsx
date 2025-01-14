import * as React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <main className="mx-auto pt-16 flex flex-col items-center justify-center min-h-screen">
                <Outlet />
            </main>
        </React.Fragment>
    )
}

export default App