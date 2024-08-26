import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MovableCart = () => {
    const products = useSelector((state) => state.orebiReducer.products);

    return (
        <div className="sm:fixed sm:bottom-4 sm:right-4">
            <Link to="/cart">
                <div className="relative">
                    <FaShoppingCart className="text-3xl" />
                    <span className="absolute font-titleFont top-0 right-0 -mt-1 -mr-1 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                        {products.length > 0 ? products.length : 0}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default MovableCart;
