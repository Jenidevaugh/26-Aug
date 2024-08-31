import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommerceABI } from "../../ABI/Commerce";
import { createPublicClient, http, custom, fallback } from "viem";
import { syscoin, rollux } from "viem/chains";
import { V2StakeERC20 } from "../../ABI/v2Stake";
import { createWalletClient } from "viem";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import useFetchProducts from "./GG";

export const GetProducts = async () => {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [productsOff1, setProductsOff] = useState([]); // Initialize products as an empty array
  const [productsCount, setProductsCount] = useState(); // Initialize products as an empty array
  const [data, setData] = useState([]); // Initialize data state to null
  const { productss, productsOff, productsCount1, loading, error } = useFetchProducts();

  const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const publicClient = createPublicClient({
      chain: rollux,
      transport: fallback([
        http('https://rpc.rollux.com'),
        http('wss://rpc.rollux.com/wss'),
        http('https://rpc.ankr.com/rollux')
      ])
    });

    const fetchData = async () => {
      try {
        const getProducts = await publicClient.readContract({
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getAllProducts',
        });

        const getProductsCount = await publicClient.readContract({
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'proxy',
        });

        // Process and set products with images
        const productsWithImages = await Promise.all(
          getProducts.map(async (product) => {
            const response = await fetch(`https://api.pinata.cloud/data/pinList?cid=${product.image}`, {
              method: 'GET',
              headers: {
                Authorization: 'Bearer YOUR_API_KEY_HERE',
              },
            });
            const imageData = await response.json();
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageData.rows[0].ipfs_pin_hash}`;
            return { ...product, imageUrl };
          })
        );

        setProducts(productsWithImages);
        setProductsOff(getProducts); // Assuming getProductsOff needs the same data as products
        setProductsCount(getProductsCount);
        //setLoading(false);
      } catch (err) {
        setError(err);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, productsOff, productsCount, loading, error };
};

const publicClient = createPublicClient({
  chain: rollux,
  transport: fallback([
    http('https://rpc.rollux.com'),
    http('wss://rpc.rollux.com/wss'),
    http('https://rpc.ankr.com/rollux')
  ])
});



const weiToEther = (wei) => wei / 1e18;

// Function to format the number as USD
const formatUSD = (number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);




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
              <p className="text-gray-800 font-bold mb-2">Price: {product.price.toString().slice(0, -18)}</p>
              <p className="text-gray-500 mb-2">Category: {product.category}</p>
              <p className="text-gray-500 mb-2">MintCap: {product.MintCap}</p>
              <p className="text-gray-500">Sold Out: {product.isSold ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    <div>
      <div>
        {productsOff.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-gray-800 font-bold mb-2">Price: {product.price.toString().slice(0, -18)}</p>
            <p className="text-gray-500 mb-2">Category: {product.category}</p>
            <p className="text-gray-500 mb-2">MintCap: {product.MintCap}</p>
            <p className="text-gray-500">Sold Out: {product.isSold ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>

    </div>
  </div>

);
};

export default GetProducts;