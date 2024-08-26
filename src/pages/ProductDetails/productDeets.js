import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
//import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import { CommerceABI } from "../../ABI/Commerce";
import { createPublicClient, http, custom } from "viem";
import { rollux } from "viem/chains";
import { createWalletClient } from "viem";
import { useDispatch } from "react-redux";
//import { addItem } from "../../redux/orebiSlice"; // Ensure this action is defined in your Redux slice
import { addToCart } from "../../redux/orebiSlice";


const publicClient = createPublicClient({
  chain: rollux,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: rollux,
  transport: custom(window.ethereum),
});

const weiToEther = (wei) => wei / 1e18;

const formatUSD = (number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

const ProductDetails1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  const dispatch = useDispatch();

  //Get products and product images from pinata by IPFS
  useEffect(() => {
    async function fetchData() {
      const [address] = await walletClient.getAddresses();
      try {
        const getProducts = await publicClient.readContract({
          account: address,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: "getAllProducts",
        });

        const getProductsCount = await publicClient.readContract({
          account: address,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: "productCount",
        });

        const productsWithImages = await Promise.all(
          getProducts.map(async (product) => {
            const options = {
              method: "GET",
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MWUzYThkOC05ZDk0LTRhZTUtYTRkOS1mYTFkYjJmZjE4MTUiLCJlbWFpbCI6ImplbmlkZXZhdWdobnF4bjg0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlNGMzNzgzNjk5YWU4NTkzN2RmZSIsInNjb3BlZEtleVNlY3JldCI6Ijc4MzZmNWM5ZGYyZWNmMjk3MWZjZTU1YWYzOGZiYmY5OTE3MmRmYTFjNjM2MGNlYzIxMjBmNDY1NDBiODc3YmMiLCJleHAiOjE3NTU0MjM5NTl9.7xCCEjj_InLKfI-B9Ri6Ssc7hEzdEYk5kQ6IVMdaA5g`, // Replace with your Pinata JWT
              },
            };

            const response = await fetch(
              `https://api.pinata.cloud/data/pinList?cid=${product.image}`,
              options
            );
            const imageData = await response.json();
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageData.rows[0].ipfs_pin_hash}`;

            return {
              ...product,
              imageUrl,
            };
          })
        );

        setProducts(productsWithImages);
        setProductsCount(getProductsCount);
        setProductInfo(location.state?.item || {});
        setPrevLocation(location.pathname);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [location]);

  useEffect(() => {
    setProductInfo(location.state?.item || {});

  }, [location]);


  const etherPrice = weiToEther(parseFloat(productInfo.price || 0));
  const formattedPrice = formatUSD(etherPrice);

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: productInfo.id.toString(),
      name: productInfo.title,
      quantity: 1,
      image: productInfo.imageUrl,
      price: productInfo.price.toString().slice(0, 2),
    }));
  };

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title={productInfo.title} />
        </div>
        <div>
          <img
            src={productInfo.imageUrl}
            alt={productInfo.title}
            className="w-full h-58 object-cover rounded-t-lg mb-4"
          />
          <h3 className="text-lg font-semibold">{productInfo.title}</h3>
          <p className="text-gray-600 mb-2">{productInfo.description}</p>
          <p className="text-gray-800 font-bold mb-2">Price: {formattedPrice}</p>
          <p className="text-gray-500 mb-2">Category: {productInfo.category}</p>
          <p className="text-gray-500 mb-2">In Stock: {productInfo.MintCap}</p>
          <p className="text-gray-500">Sold Out: {productInfo.isSold ? "Yes" : "No"}</p>

        </div>

      </div>
      <hr />
      <br></br>
      <div className="flex justify-center">
        <button
          onClick={handleAddToCart}
          className="w-11/12 py-4 px-2 bg-blue rounded-lg hover:bg-black duration-300 text-white text-lg font-titleFont"
        >
          Add to Cart
        </button>
      </div>
      <br></br>
      <br></br>

    </div>
  );
};

export default ProductDetails1;