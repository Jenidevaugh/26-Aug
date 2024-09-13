// src/pages/ProductsByOwner.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPublicClient, http } from "viem";
import { rollux } from "viem/chains";
import { CommerceABI } from "../../ABI/Commerce";
import { useSelector } from "react-redux";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Loading from "../Others/Loadingss";
import { PinataSDK } from "pinata";

const Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MWUzYThkOC05ZDk0LTRhZTUtYTRkOS1mYTFkYjJmZjE4MTUiLCJlbWFpbCI6ImplbmlkZXZhdWdobnF4bjg0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwODM1NGM5YzUzNDc0ZGRiNTYyNSIsInNjb3BlZEtleVNlY3JldCI6IjBiMTY1NDQwNGMxZDAwOTIzYmU3YzZjMDQzOTYwZGU3NzdmMDEyYmUwZGZjMjJiYjNiNDNmY2VmNDBhOTM3MjUiLCJleHAiOjE3NTU3NDg3NzV9.GTO6sKrnG9PmaCwIDXb1lwALHzwhBsqGk37mAHn21Uk';

const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

const ProductsByOwner = () => {
  const { ownerAddress } = useParams(); // Fetch owner address from route params
  const [products, setProducts] = useState([]);
  const [products11, setProducts11] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // Hook for navigation
  const vendorAddress1 = useSelector((state) => state.orebiReducer.vendorAddress);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    if (vendorAddress1) { // Check if vendorAddress1 exists
      const fetchProducts = async () => {
        setIsLoading(true); // Start loading

        const publicClient = createPublicClient({
          chain: rollux,
          transport: http('https://rpc.rollux.com'),
        });

        try {
          const getProducts = await publicClient.readContract({
            address: Commercecontract,
            abi: CommerceABI,
            functionName: "getAllProducts",
          });

          setProducts11(getProducts);
          console.log('Fetched Products:', getProducts);

          const filteredProducts = getProducts.filter(
            (product) => product.owner === ownerAddress
          );

          const vendorProductsList = getProducts.filter(product => product.owner === vendorAddress1);
          setVendorProducts(vendorProductsList);

          // Ensure getProducts is an array
          if (Array.isArray(getProducts)) {
            setOrders(filteredProducts);
          } else {
            console.error('Fetched data is not an array:', getProducts);
          }
          console.log('Filtered Products:', Orders);

          const productsWithImages = await Promise.all(
            vendorProductsList.map(async (product) => {
              const options = {
                method: "GET",
                headers: {
                  Authorization: Authorization,
                  Request: 'no-cors',
                },
              };

              const response = await fetch(
                `https://api.pinata.cloud/data/pinList?cid=${product.image}`,
                options
              );

              if (!response.ok) {
                throw new Error(`Failed to fetch image data: ${response.statusText}`);
              }

              const imageData = await response.json();
              const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageData.rows[0].ipfs_pin_hash}`;

              return {
                ...product,
                imageUrl,
              };
            })
          );

          setProducts(productsWithImages);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false); // End loading
        }
      };

      fetchProducts();

      // Set up polling if needed
      const intervalId = setInterval(fetchProducts, 3000);
      return () => clearInterval(intervalId);
    }
  }, [vendorAddress1, ownerAddress]);

  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`, { state: { item: product } });
  };

  console.log('Owner', vendorProducts);

  const slicedAddress = ownerAddress.slice(0, 10);

  return (
    <div className="w-full mx-auto">
      {isLoading ? ( // Show loading indicator while data is loading
        <p className="text-gray-500 text-center py-9"><Loading /></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-9">No products found.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <p className="text-l font-semibold bg-blue-100 text-blue rounded-lg px-6 py-4 shadow-md">
                  Products by : {slicedAddress}
                </p>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-800 font-bold mb-2">Price: {product.price}</p>
                <p className="text-gray-500 mb-2">Category: {product.category}</p>
                <p className="text-gray-500 mb-2">MintCap: {product.MintCap}</p>
                <p className="text-gray-500">Sold Out: {product.isSold ? "Yes" : "No"}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsByOwner;
