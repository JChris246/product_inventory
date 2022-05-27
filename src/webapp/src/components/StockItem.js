const StockItem = ({ item: { stockId, count }, updateStockItem }) => {
    const updateStock = (difference) => {
        const record = {
            stockId,
            count: count + difference
        };

        updateStockItem(record);
    }

    return (
        <div className="flex flex-col mx-8 my-4 h-fit items-center hover:scale-105
            transition-transform duration-500 hover:cursor-pointer">
            <img src={stockId.product.image} alt={name} className="rounded-md w-4/5"/>
            <div className="flex flex-col pt-2">
                <span className="pr-4 text-gray-300 font-semibold">{stockId.product.name}</span>
                <div>
                    <span className="pr-4 text-gray-300 font-normal">{stockId.expirationDate}</span>
                    <span className="pr-4 text-gray-300 font-light">{count + " left"}</span>
                </div>
            </div>
            <div className="text-gray-200 flex justify-between w-full mt-2 bg-zinc-900">
                <button onClick={() => updateStock(1)} className="px-4 py-2 bg-green-500">+</button>
                <button onClick={() => updateStock(-1)} className="px-4 py-2 bg-red-600">-</button>
            </div>
        </div>
    );
};

export default StockItem;