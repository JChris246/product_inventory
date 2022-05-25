import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import Products from "./components/Products";
import Stock from "./components/Stock";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="/" element={<Products/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/stock" element={<Stock/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
