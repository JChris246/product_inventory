import { useEffect, useState } from "react";

import Product from "./Product";
import Plus from "../assets/icons/Plus";
import AddNewProductDialog from "./AddNewProductDialog";
import AddNewStockItemDialog from "./AddNewStockItem";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [addNewProductModal, setAddNewProductModal] = useState(false);
    const [addNewStockItemModal, setAddNewStockItemModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(-1);

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

    const handleAddNewProductDialogClose = (product) => {
        if (product)
            setProducts([...products, product]);
        setAddNewProductModal(false);
    };

    const handleAddNewStockItemDialogClose = () => {
        setAddNewStockItemModal(false);
    }

    const addStockItem = (id) => {
        setSelectedProduct(id);
        setAddNewStockItemModal(true);
    }

    return (
        <div className="h-full overflow-y-scroll">
            { addNewProductModal && <AddNewProductDialog onClose={handleAddNewProductDialogClose}/> }
            { addNewStockItemModal && <AddNewStockItemDialog onClose={handleAddNewStockItemDialogClose}
                product={selectedProduct} products={products} /> }
            <button onClick={() => setAddNewProductModal(true)} className="px-4 py-2 bg-sky-700
                hover:bg-sky-600 text-neutral-200 flex justify-center items-center mb-8">
                <Plus/>
                <span className="ml-2">Add new Product</span>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
                { products.map((product, key) => <Product product={product} addStockItem={addStockItem} key={key}/>) }
            </div>
        </div>
    )
};

export default Products;