import Banner from "../../components/Banner/Banner";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPublicClient, createWalletClient } from "viem";
import { CommerceABI } from "../../ABI/Commerce";
import { rollux } from "viem/chains";
import { custom, http } from "viem";
import { useEffect } from "react";
import { useAccount } from "wagmi";


const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";



const Products = () => {

  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [category1, setCategory1] = useState(false);
  const [banner, setBanner] = useState(false);
  const [sortVendor, setSortVendor] = useState([]);
  const [Orders, setOrders] = useState([]);
  const { address, isConnected } = useAccount();

  const [products, setProducts] = useState([]); // Initialize products as an empty array



  const [vendorProducts, setVendorProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const publicClient = createPublicClient({
        chain: rollux,
        transport: http('https://rpc.rollux.com')
      });

      const walletClient = createWalletClient({
        chain: rollux,
        transport: custom(window.ethereum)
      });

      const [addressa] = await walletClient.getAddresses();

      try {
        const getProducts = await publicClient.readContract({
          account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getAllProducts',
        });

        const getBuyerOrders = await publicClient.readContract({
          account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getBuyerOrders',
          args: [addressa]
        });

        //  console.log('Products response:', getBuyerOrders);

        setSortVendor(getProducts);

        setOrders(getBuyerOrders);

        const vendorProductsList = getProducts.filter(product => product.owner === address);
        setVendorProducts(vendorProductsList);


// console.log('Products response:', vendorProductsList);
        // Fetch images for each product based on the IPFS CID
        const productsWithImages = await Promise.all(
          getProducts.map(async (product) => {
            const options = {
              method: 'GET',
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MWUzYThkOC05ZDk0LTRhZTUtYTRkOS1mYTFkYjJmZjE4MTUiLCJlbWFpbCI6ImplbmlkZXZhdWdobnF4bjg0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwODM1NGM5YzUzNDc0ZGRiNTYyNSIsInNjb3BlZEtleVNlY3JldCI6IjBiMTY1NDQwNGMxZDAwOTIzYmU3YzZjMDQzOTYwZGU3NzdmMDEyYmUwZGZjMjJiYjNiNDNmY2VmNDBhOTM3MjUiLCJleHAiOjE3NTU3NDg3NzV9.GTO6sKrnG9PmaCwIDXb1lwALHzwhBsqGk37mAHn21Uk',
              },
            };

            const response = await fetch(`https://api.pinata.cloud/data/pinList?cid=${product.image}`, options);
            const imageData = await response.json();

            // Assuming imageData.rows contains image data, adjust as needed
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageData.rows[0].ipfs_pin_hash}`;

            return {
              ...product,
              imageUrl, // Add the image URL to the product object
            };
          })
        );


        // Update state with products and their associated images
        setProducts(productsWithImages);
        // setProductsCount(getProductsCount);

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  console.log('Products response:', products);

  console.log(Orders, 'vendor')
  //console.log(address)

  return (
    <div className="w-full mx-auto">
      <Header />

      <h4>Your Products Listed  for {address}</h4>

      <div className="w-full bg-ash bg-opacity-40  Mix1 my-2 border px-4 py-6">
        <h4>Your Current Listed Products</h4>

        <div className="">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg my-2 p-4 transition-transform transform hover:scale-95 hover:shadow-2xl duration-300 cursor-pointer flex flex-wrap items-start"
            >
              <div className="flex-shrink-0 w-32 h-32 mr-4">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow max-w-full">
                <h3 className="text-lg font-semibold mb-2 truncate">Owner: {product.buyer}</h3>
                <p className="text-gray-500 mb-1 truncate">Name: {product.title}</p>
                 <p className="text-gray-500 mb-1 truncate">Category: {product.category}</p>
                <p className="text-gray-500 mb-1 truncate">Description: {product.description}</p>
                <p className="text-gray-500 mb-1 truncate">Price: {product.price.toString()}</p>
                <p className="text-gray-500 mb-1 truncate">Sold Out: {product.isSold}</p>
              </div>

              <input
              className="w-full h-11 px-3 border text-primeColor text-sm outline-none border-gray-900 rounded"
              type="number"
              placeholder="Increase Mint"
            />            
            
            <button className="w-20 border my-2 py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont rounded">
              Set
            </button></div>
          ))}
        </div>

      </div>






      <span className="px-5"></span>

      <Footer />
      <FooterBottom />


    </div>
  );
};

export default Products;
