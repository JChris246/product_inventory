const Product = ({ image, name }) => {
    return (
        <div className="flex flex-col mx-8 my-4 h-fit items-center">
            <img src={image} alt={name} className="rounded-md w-4/5"/>
            <span className="py-2 text-gray-400">{name}</span>
        </div>
    )
}

export default Product;