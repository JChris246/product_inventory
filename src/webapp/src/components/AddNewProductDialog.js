import { useState } from "react";

import Modal from "./Modal";
import Plus from "../assets/icons/Plus";
import TextInput from "./TextInput";

import { NotificationType, useNotificationContext } from "./Notification";

const AddNewProductDialog = ({ onClose }) => {
    const [product, setProduct] = useState({ name: "", image: "" });
    const { display: displayNotification } = useNotificationContext();

    const updateForm = (e) => {
        const { value, name } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const cancel = (e) => {
        e.preventDefault();
        onClose();
    }

    const addProduct = async (e) => {
        e.preventDefault();

        if (product.name.length < 1) {
            displayNotification({ message: "Empty product name", type: NotificationType.Error });
            return;
        }

        if (product.image.length < 1) {
            displayNotification({ message: "Empty product image", type: NotificationType.Error });
            return;
        }

        const result = await fetch("/api/product", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ ...product })
        });

        if (result.ok) {
            displayNotification({ message: "Added product!", type: NotificationType.Success });
            setProduct({ name: "", image: "" });
            onClose(product);
        } else
            displayNotification({ message: "An error occurred adding product!", type: NotificationType.Error });
    }

    return (
        <Modal onClose={onClose} center>
            <div className="w-5/6 sm:w-3/5 md:w-2/5 h-fit bg-neutral-800 rounded-md">
                <h2 className="text-xl text-gray-200 w-fit mx-auto mt-4 mb-2 font-semibold">Add a new Product</h2>
                <form className="p-2 flex flex-col" onSubmit={addProduct}>
                    <TextInput label="name" value={product.name} name="name" placeholder="product name"
                        update={updateForm}/>
                    <TextInput label="image" value={product.image} name="image" placeholder="product image"
                        update={updateForm}/>
                    <section className="flex justify-end space-x-2 mt-4">
                        <button onClick={cancel} className="hover:bg-red-700 bg-red-600 text-gray-200
                            rounded-md py-2 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                className="h-5 w-5 fill-neutral-200">
                                <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0
                                    256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362
                                    149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1
                                    362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448
                                    256V256z"/>
                            </svg>
                            <span className="ml-2">Cancel</span>
                        </button>
                        <button onClick={addProduct} className="hover:bg-green-600 bg-green-500 text-gray-200
                            rounded-md py-2 px-4 flex items-center">
                            <Plus/>
                            <span className="ml-2">Add</span>
                        </button>
                    </section>
                </form>
            </div>
        </Modal>
    )
}

export default AddNewProductDialog;