import { useEffect, useState } from "react";

import Product from "./Product";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await fetch("/api/products");
            if (result.ok) {
                (async () => {
                    const json = await result.json();
                    setProducts(json);
                })();
            }
        })();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full overflow-y-scroll">
            { products.map((product, key) => <Product name={product.name} image={product.image} key={key}/>) }
        </div>
    )
};

export default Products;