import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommerceABI } from "../../ABI/Commerce";
import { createPublicClient, http, custom } from "viem";
import { syscoin, rollux } from "viem/chains";
import { V2StakeERC20 } from "../../ABI/v2Stake";
import { createWalletClient } from "viem";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const publicClient = createPublicClient({
  chain: rollux,
  transport: http()
});


const walletClient = createWalletClient({
  chain: rollux,
  transport: custom(window.ethereum)
});


const weiToEther = (wei) => wei / 1e18;

// Function to format the number as USD
const formatUSD = (number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);


export const GetProducts = () => {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [productsCount, setProductsCount] = useState(); // Initialize products as an empty array
  const [data, setData] = useState([]); // Initialize data state to null

  const navigate = useNavigate(); // Hook for navigation

  const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

  useEffect(() => {
    async function fetchData() {
      const [addressa] = await walletClient.getAddresses();
      try {
        const getProducts = await publicClient.readContract({
          account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getAllProducts',
        });

        const getProductsCount = await publicClient.readContract({
          account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'proxy',
        });

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
        setProductsCount(getProductsCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  console.log(products);
  //console.log(productsCount);

  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`, { state: { item: product } });
  };

  // Convert and format the price
  const etherPrice = weiToEther(parseFloat(products.price));
  const formattedPrice = formatUSD(etherPrice);

  //Open Nav BAr to set shop product view result 
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div>
      {/* Dropdown and Side Navigation at the Top */}
      <div className="flex flex-col gap-4 bg-ash-500 p-4 ">
        {/* Dropdown Button */}
        <div className="mb-4">
          <button
            onClick={toggleNav}
            className="w-full bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isNavOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Side Navigation - Toggle Visibility */}
        {isNavOpen && (
          <div className="w-full mb-4 text-black">
            <ShopSideNav />
          </div>
        )}
      </div>

      {/* Product List Below */}
      <div className="my-2 px-3 py-5 bg-ash">
        <h4 className="text-xl font-bold mb-4">Product List</h4>
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-800 font-bold mb-2">Price: {product.price.toString().slice(0, 2)}</p>
                <p className="text-gray-500 mb-2">Category: {product.category}</p>
                <p className="text-gray-500 mb-2">MintCap: {product.MintCap}</p>
                <p className="text-gray-500">Sold Out: {product.isSold ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default GetProducts;