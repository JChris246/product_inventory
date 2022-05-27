const Product = ({ product: { image, name, id }, addStockItem }) => {

    return (
        <div className="flex flex-col mx-8 my-4 h-fit items-center hover:scale-105
            transition-transform duration-500 hover:cursor-pointer">
            <img src={image} alt={name} className="rounded-md w-4/5"/>
            <div className="flex items-center pt-2">
                <span className="pr-4 text-gray-400">{name}</span>
                <button onClick={() => addStockItem(id)} className="bg-green-500 hover:bg-green-600 text-gray-100
                    rounded-full text-xl px-2 h-fit">+</button>
            </div>
        </div>
    )
}

export default Product;