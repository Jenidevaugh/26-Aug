import { useLocation } from "react-router-dom";
import React from "react";

const ProductD = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Retrieve product details from the state

    if (!product) {
        return <div>No product data available</div>;
    }

    console.log(product)

    return (
        <div className="product-details">
            <h1>{product.title}</h1>
            <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover mb-4" />
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>MintCap: {product.MintCap}</p>
            <p>Sold Out: {product.isSold ? "Yes" : "No"}</p>
            {/* Add more product details as needed */}

            <p>Owner: {product.owner}</p>

        </div>
    );
};

export default ProductD;
