import { Outlet } from "react-router";

import Sidebar from "../components/Sidebar";

function Home() {
    return (
        <div className="h-screen bg-neutral-800 flex flex-col-reverse md:flex-row">
            <Sidebar/>
            <main className="h-full w-full mb-24">
                <Outlet/>
            </main>
        </div>
    );
}

export default Home;