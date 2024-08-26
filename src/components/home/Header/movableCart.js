import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";;

export const MovableCart = () => {
    const products = useSelector((state) => state.orebiReducer.products);

    return (
        <>
            <div>
                <Link to="/cart">
                    <div className="relative z-50 ">
                        <FaShoppingCart />
                        <span className="absolute font-titleFont top-13 right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                            {products.length > 0 ? products.length : 0}
                        </span>
                        <h1>Test B</h1>
                    </div>
                </Link>

            </div>
        </>
    )
}