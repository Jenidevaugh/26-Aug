import { useLocation } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import ProductsOnSale from "./ProductsOnSale";

//const product = ({ products }) => {
//  const dispatch = useDispatch();
//  return (
//    <div className="flex flex-col gap-5">
//      <h2 className="text-4xl font-semibold">{product.productName}</h2>
//      <p className="text-xl font-semibold">${product.price}</p>
//      <p className="text-base text-gray-600">{product.des}</p>
//      <p className="text-sm">Leave a review.</p>
//      <p className="font-medium text-lg">
//        <span className="font-normal">Colors:</span> {product.color}
//      </p>
//      <button
//        onClick={() =>
//          dispatch(
//            addToCart({
//              _id: product.id,
//              name: product.productName,
//              quantity: 1,
//              image: product.img,
//              badge: product.badge,
//              price: product.price,
//              colors: product.color,
//            })
//          )
//        }
//        className="w-full py-4 bg-blue rounded-lg hover:bg-black duration-300 text-white text-lg font-titleFont"
//      >
//        Add to Cart
//      </button>
//      <p className="font-normal text-sm">
//        <span className="text-base font-medium"> Categories:</span> Spring
//        collection, Streetwear, Women Tags: featured SKU: N/A
//      </p>
//    </div>
//  );
//};
//
//export default product;



// Function to convert wei to ether

//const weiToEther = (wei) => wei / 1e18;
//
//// Function to format the number as USD
//const formatUSD = (number) =>
//  new Intl.NumberFormat('en-US', {
//    style: 'currency',
//    currency: 'USD',
//  }).format(number);
//
//const ProductD = () => {
//  const dispatch = useDispatch();
//
//  const location = useLocation();
//  const { product } = location.state || {}; // Retrieve product details from the state
//
//  if (!product) {
//    return <div>No product data available</div>;
//  }
//
//  console.log(product.id.toString())
//
//  // Convert and format the price
//  const etherPrice = weiToEther(parseFloat(product.price));
//  const formattedPrice = formatUSD(etherPrice);
//
//  return (
//    <div className="w-full">
//      <h1 className="text-3xl font-bold mb-4 text-left">{product.title}</h1>
//
//      <img src={product.imageUrl} alt={product.title} className="w-full h-fit object-cover mb-4" />
//
//      <div className="text-left mb-6">
//        <p className="text-xl font-semibold text-gray-800 mb-2">{product.description}</p>
//        <p className="text-lg text-gray-700 gap-1"><span className="font-semibold">Price:</span> {formattedPrice}</p>
//        <p className="text-lg text-gray-700"><span className="font-semibold">Category:</span> {product.category}</p>
//        <p className="text-lg text-gray-700"><span className="font-semibold">MintCap:</span> {product.MintCap}</p>
//        <p className="text-lg text-gray-700"><span className="font-semibold">Sold Out:</span> {product.isSold ? "Yes" : "No"}</p>
//      </div>
//
//      <button
//        onClick={() =>
//          dispatch(
//            addToCart({
//              _id: product.id.toString(),
//              name: product.productName,
//              quantity: 1,
//              image: product.img,
//              badge: product.badge,
//              price: product.price.toString(),
//              colors: product.color,
//            })
//          )
//        }
//        className="w-full py-4 bg-blue rounded-lg hover:bg-black duration-300 text-white text-lg font-titleFont"
//      >
//        Add to Cart
//      </button>
//    </div>
//  );
//};
//
//export default ProductD;
//