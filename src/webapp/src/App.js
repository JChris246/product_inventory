import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import Products from "./components/Products";
import Stock from "./components/Stock";
import { Notification, NotificationProvider } from "./components/Notification";

function App() {
    return (
        <NotificationProvider>
            <Notification/>
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
        </NotificationProvider>
    );
}

export default App;
