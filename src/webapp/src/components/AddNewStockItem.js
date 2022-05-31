import { useState } from "react";

import Modal from "./Modal";
import Plus from "../assets/icons/Plus";
import TextInput from "./TextInput";

import { NotificationType, useNotificationContext } from "./Notification";

const NumberInput = ({ label, value, update, name, min, max }) => {
    return (
        <div className="flex items-center justify-between my-2">
            <label htmlFor={name} className="text-lg text-gray-200 capitalize">{label}</label>
            <input type="number" value={value} onChange={update} name={name}
                min={min} max={max} className="border-none px-2 py-1 rounded-sm w-2/3 md:w-4/5 outline-none
                placeholder:text-stone-400 text-neutral-100 bg-neutral-600 focus:outline-green-400"/>
        </div>
    );
};

const AddNewStockItemDialog = ({ onClose, products, product }) => {
    const [stockItem, setStockItem] = useState({ productId: product, expirationDate: "", count: 1 });
    const { display: displayNotification } = useNotificationContext();

    const updateForm = (e) => {
        const { value, name } = e.target;
        setStockItem({ ...stockItem, [name]: value });
    };

    const cancel = (e) => {
        e.preventDefault();
        onClose();
    }

    const validateExpirationString = (str) => {
        if (!str)
            return { valid: false };
        str = str.trim();
        if (str.length < 1)
            return { valid: false };
        str = str.replaceAll(".", "/");
        if (!str.match(/\d{2}\/\d{2}\/\d{4}/))
            return { valid: false };
        return { valid: true, str };
    }

    const addStockItem = async (e) => {
        e.preventDefault();

        if (!stockItem.productId && stockItem.productId !== 0) {
            displayNotification({ message: "Please select a product", type: NotificationType.Error });
            return;
        }

        const date = validateExpirationString(stockItem.expirationDate);
        if (!date.valid) {
            displayNotification({ message: "Invalid expiration datePlease select a product", type: NotificationType.Error });
            return;
        }

        if (stockItem.count < 1) {
            displayNotification({ message: "Is the amount really less than 1", type: NotificationType.Error });
            return;
        }

        const result = await fetch("/api/stock", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ ...stockItem, expirationDate: date.str })
        });

        if (result.ok) {
            displayNotification({ message: "Added Item to stock!", type: NotificationType.Success });
            setStockItem({ productId: product, expirationDate: "", count: 1 });
            onClose();
        } else
            displayNotification({ message: "An error occurred adding product!", type: NotificationType.Success });
    }

    return (
        <Modal onClose={onClose} center>
            <div className="w-5/6 sm:w-3/5 md:w-2/5 h-fit bg-neutral-800 rounded-md">
                <h2 className="text-xl text-gray-200 w-fit mx-auto mt-4 mb-2 font-semibold">Add Item to stock</h2>
                <form className="p-2 flex flex-col" onSubmit={addStockItem}>
                    <select name="productId" onChange={updateForm} defaultValue={product}
                        className="bg-neutral-600 text-gray-200 py-2 px-1 rounded-sm">
                        { products.map(({ id, name }) => <option key={id} value={id}>{name}</option>) }
                    </select>
                    <TextInput label="expiration date" value={stockItem.expirationDate} name="expirationDate"
                        placeholder="dd/mm/yyyy" update={updateForm}/>
                    <NumberInput label="amount" value={stockItem.count} update={updateForm} name="count" min="1"
                        max="100"/>
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
                        <button onClick={addStockItem} className="hover:bg-green-600 bg-green-500 text-gray-200
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

export default AddNewStockItemDialog;