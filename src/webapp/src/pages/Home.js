import { Outlet } from "react-router";

import Sidebar from "../components/Sidebar";

function Home() {
    return (
        <div className="h-screen bg-neutral-800 flex">
            <Sidebar/>
            <main className="h-full w-full">
                <Outlet/>
            </main>
        </div>
    );
}

export default Home;