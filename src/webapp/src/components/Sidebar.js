import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-full md:w-2/5 lg:w-1/5 h-fit md:h-full bg-zinc-900 p-0 fixed bottom-0 z-[5] md:static">
            <nav className="w-full flex flex-row md:flex-col">
                <Link to="/products" className="w-fit md:w-full py-6 px-8 md:py-4 md:px-2 text-gray-200 bg-zinc-800
                    hover:bg-zinc-700 hover:cursor-pointer flex items-center" title="Products">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 md:w-5 md:h-5
                        fill-gray-100">
                        <path d="M494.6 255.9c-65.63-.8203-118.6-54.14-118.6-119.9c-65.74
                            0-119.1-52.97-119.8-118.6c-25.66-3.867-51.8 .2346-74.77 12.07L116.7
                            62.41C93.35 74.36 74.36 93.35 62.41 116.7L29.6 181.2c-11.95 23.44-16.17
                            49.92-12.07 75.94l11.37 71.48c4.102 25.9 16.29 49.8 34.81 68.32l51.36 51.39C133.6
                            466.9 157.3 479 183.2 483.1l71.84 11.37c25.9 4.101 52.27-.1172
                            75.59-11.95l64.81-33.05c23.32-11.8442.31-30.82 54.14-54.14l32.93-64.57C494.3 307.7
                            498.5 281.4 494.6 255.9zM176 367.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37
                            32 31.1S193.6 367.1 176 367.1zM208 208c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32
                            14.37 32 31.1S225.6 208 208 208zM368 335.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32
                            14.37 32 31.1S385.6 335.1 368 335.1z"/>
                    </svg>
                    <span className="hidden md:block ml-2">Products</span>
                </Link>
                <Link to="/stock" className="w-fit md:w-full py-6 px-8 md:py-4 md:px-2 text-gray-200 bg-zinc-800
                    hover:bg-zinc-700 hover:cursor-pointer flex items-center" title="Stock">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-8 h-8 md:w-5 md:h-5
                        fill-gray-100">
                        <path d="M160 48C160 21.49 181.5 0 208 0H256V80C256 88.84 263.2 96 272 96H304C312.8 96 320
                            88.84 320 80V0H368C394.5 0 416 21.49 416 48V176C416 202.5 394.5 224 368 224H208C181.5 224
                            160 202.5 160 176V48zM96 288V368C96 376.8 103.2 384 112 384H144C152.8 384 160 376.8 160
                            368V288H208C234.5 288 256 309.5 256 336V464C256 490.5 234.5 512 208 512H48C21.49 512 0
                            490.5 0 464V336C0 309.5 21.49 288 48 288H96zM416 288V368C416 376.8 423.2 384 432
                            384H464C472.8 384 480 376.8 480 368V288H528C554.5 288 576 309.5 576 336V464C576 490.5
                            554.5 512 528 512H368C341.5 512 320 490.5 320 464V336C320 309.5 341.5 288 368 288H416z"/>
                    </svg>
                    <span className="hidden md:block ml-2">Stock</span>
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;