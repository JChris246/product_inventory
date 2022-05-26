import { useEffect, useState } from "react";

import Product from "./Product";
import Plus from "../assets/icons/Plus";
import AddNewProductDialog from "./AddNewProductDialog";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [addNewModal, setAddNewModal] = useState(false);

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

    const addNewProduct = (product) => {
        if (product)
            setProducts([...products, product]);
        setAddNewModal(false);
    };

    return (
        <div className="h-full overflow-y-scroll">
            { addNewModal && <AddNewProductDialog onClose={addNewProduct}/> }
            <button onClick={() => setAddNewModal(true)} className="px-4 py-2 bg-sky-700
                hover:bg-sky-600 text-neutral-200 flex justify-center items-center mb-8">
                <Plus/>
                <span className="ml-2">Add new Product</span>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
                { products.map((product, key) => <Product name={product.name} image={product.image} key={key}/>) }
            </div>
        </div>
    )
};

export default Products;