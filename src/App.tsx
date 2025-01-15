import * as React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "@/components/navigation/Navbar.tsx"

function App () {
    return (
        <React.Fragment>
            <Navbar />
            <main className="mx-auto flex flex-col items-center justify-center min-h-screen">
                <Outlet />
            </main>
        </React.Fragment>
    )
}

export default App