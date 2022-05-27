import { useEffect, useState } from "react";

import StockItem from "./StockItem";

const Stock = () => {
    const [stockItems, setStockItems] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await fetch("/api/stock");
            if (result.ok) {
                (async () => {
                    const json = await result.json();
                    setStockItems(json);
                })();
            }
        })();
    }, []);

    const updateStock = async (record) => {
        const result = await fetch("/api/stock", {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify({
                productId: record.stockId.product.id,
                count: record.count,
                expirationDate: record.stockId.expirationDate
            })
        });

        if (result.ok) {
            let index = stockItems.findIndex(item =>
                record.stockId.product.id === item.stockId.product.id &&
                record.stockId.expirationDate === item.stockId.expirationDate
            );

            if (index !== -1)
                setStockItems(prev => [...prev.slice(0, index), record, ...prev.slice(index + 1)]);
        }
    }

    const sortByDate = (a, b) => {
        const [, dayA, monthA, yearA] = a.stockId.expirationDate.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        const [, dayB, monthB, yearB] = b.stockId.expirationDate.match(/(\d{2})\/(\d{2})\/(\d{4})/);

        const dateA = new Date(yearA, monthA, dayA === 0 ? 1 : dayA, 0, 0, 0, 0);
        const dateB = new Date(yearB, monthB, dayB === 0 ? 1 : dayA, 0, 0, 0, 0);

        return dateA.getTime() - dateB.getTime();
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full overflow-y-scroll">
            { stockItems
                .sort(sortByDate)
                .map((item, key) => <StockItem key={key} item={item} updateStockItem={updateStock}/>) }
        </div>
    )
};

export default Stock;