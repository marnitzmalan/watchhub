import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar.tsx";
import AutoScrollToTop from "@/components/AutoScrollToTop.tsx";
import ScrollToTopButton from "@/components/ScrollToTopButton";

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <main className="mx-auto min-h-screen">
                <AutoScrollToTop />
                <Outlet />
            </main>
            <ScrollToTopButton />
        </React.Fragment>
    );
}

export default App;
