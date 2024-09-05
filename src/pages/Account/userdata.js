import Banner from "../../components/Banner/Banner";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import ProfileLog from "./ProfileLog";
import { GetProducts } from "../Shop/GetProd";
import { createPublicClient, createWalletClient } from "viem";
import { CommerceABI } from "../../ABI/Commerce";
import { rollux } from "viem/chains";
import { custom, http } from "viem";
import { FaAccessibleIcon } from "react-icons/fa";

const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";


const UserData = () => {
  const navigate = useNavigate(); // initialize useNavigate
  const [Orders1, setOrders1] = useState([]);
  const [ProductGet, setProductIDGet] = useState([]);
  const [sortVendor, setSortVendor] = useState([]);
  const [Orders, setOrders] = useState([]);
  const { address, isConnected } = useAccount();



  useEffect(() => {
    if (!isConnected || !address) {
      navigate('/signin'); // redirect to accounts page if not connected 
    } else {
      // Redirect to /signin if not connected or no address
      navigate('/userData');
    }
  }, [isConnected, address, navigate]);



  const walletClient = createWalletClient({
    chain: rollux,
    transport: custom(window.ethereum)
  });

  //Get all orders 
  // useEffect(() => {
  //  async function getOrders() {
  //    const [addressa] = await walletClient.getAddresses();
  //
  //    const publicClient = createPublicClient({
  //      chain: rollux,
  //      transport: http()
  //    });
  //
  //    const fetchOrder = async (index) => {
  //      try {
  //        // Fetch order at a specific index
  //        const order = await publicClient.readContract({
  //          account: addressa,
  //          address: Commercecontract,
  //          abi: CommerceABI,
  //          functionName: 'orders',
  //          args: [index]
  //        });
  //        return order;
  //      } catch (error) {
  //        console.error(`Failed to fetch order at index ${index}:`, error);
  //        return null;
  //      }
  //    };
  //
  //    const fetchAllOrders = async () => {
  //      const allOrders = [];
  //      for (let i = 0; i <= 3; i++) {
  //        const order = await fetchOrder(i);
  //        if (order) {
  //          allOrders.push(order);
  //        }
  //      }
  //      return allOrders;
  //    };
  //
  //    try {
  //      const orders = await fetchAllOrders();
  //      setOrders1(orders);
  //      console.log(orders);
  //    } catch (error) {
  //      console.error('Failed to fetch orders:', error);
  //    }
  //  }
  //
  //  getOrders();
  //}, []);

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

        const vendorProductsList = getProducts.filter(product => product.owner.toLowerCase() === address.toLowerCase());
        setVendorProducts(vendorProductsList);

        // Assuming getBuyerOrders is an array of objects with an 'id' property
        const ids = getBuyerOrders.map(order => order.productId.toString());

        // Fetch product data for each ID individually
        const productPromises = ids.map(async (id) => {
          try {
            const product = await publicClient.readContract({
              // account: addressa,
              address: Commercecontract,
              abi: CommerceABI,
              functionName: 'products',
              args: [id] // Call with individual ID
            });

            //  console.log(product, 'tt')
            return { id, product };
          } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            return { id, error: error.message };
          }
        });

        // Await all product promises
        const products = await Promise.all(productPromises);

        // Log all products (and any errors)
        //   console.log('Products response:', productPromises);


      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  console.log(vendorProducts, 'vendor')
  console.log(address)

  //Get individua search for each productID

  //  useEffect(() => {
  //   async function fetchData() {
  //
  //     const publicClient = createPublicClient({
  //       chain: rollux,
  //       transport: http()
  //     });
  //
  //     const walletClient = createWalletClient({
  //       chain: rollux,
  //       transport: custom(window.ethereum)
  //     });
  //
  //     const [addressa] = await walletClient.getAddresses();
  //
  //     try {
  //       const products = await publicClient.readContract({
  //         account: addressa,
  //         address: Commercecontract,
  //         abi: CommerceABI,
  //         functionName: 'products',
  //         args: ['2'],
  //       });
  //       
  //       setProductIDGet(products);
  //
  //        console.log(products);
  //
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //
  //   fetchData();
  // }, []);
  //
  // console.log(address);

  return (
    <div className="bg-white ">
      <Header />

      <div>
        <div className="bg-blue bg-opacity-40 w-full mx-auto my-5 border px-4 py-6">
          <div>
            <ProfileLog />
          </div>
        </div></div>
      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">


        <div className="w-full mx-auto my-5 border px-4 py-6">
         <h4 className="flex gap-2"> <FaAccessibleIcon/>Your Current Pending Orders </h4>

          <div className="w-full bg-ash bg-opacity-40  Mix1 my-2 border px-4 py-6">

            <div>
              {Orders.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg my-2 p-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                >
                  <p className="text-gray-500 mb-2 gap-1">Order No.: {product.id.toString()}</p>
                  <h3 className="text-lg font-semibold">Buyer: {product.buyer == address ? "You" : "Somethig May be Wrong"}</h3>
                  <p className="text-gray-500 mb-2">productId: {product.productId.toString()}</p>
                  <p className="text-gray-500">  Completed: {product.state === 0 ? "No" : product.state === 1 ? "Yes" : "Unknown"}
                  </p>
                </div>
              ))}

            </div>

          </div>
          <div className="w-full bg-ash bg-opacity-40  Mix1 my-2 border px-4 py-6">
            <h4>Your Current Completed Orders</h4>

            <div>
              {Orders1.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg my-2 p-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                >
                  <h3 className="text-lg font-semibold">Buyer: {product.buyer}</h3>
                  <p className="text-gray-500 mb-2">productId: {product.productId}</p>
                  <p className="text-gray-500">  Completed: {product.state === 0 ? "No" : product.state === 1 ? "Yes" : "Unknown"}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>

      </div>


      <div className="w-90 mx-auto border-4 border-blue-500 rounded-lg px-1 py-6 mx-4">
        <div className="flex flex-wrap justify-between items-start p-4 border rounded-lg bg-white shadow-md">
          <div className="flex flex-col w-full md:w-1/3 space-y-2">
            <h4 className="text-lg font-semibold">Your current stake info</h4>
            <p>Total Staked tokens in stake pool</p>
            <p>Your SYSL Balance is 20 SYSL</p>
            <h4 className="text-lg font-semibold">Your Current Stake position</h4>
            <p>Total Staked tokens is {2}</p>
            <p>Total Reward accumulated: {2}</p>

          </div>

          <div className="my-2">
            <input
              className="w-full h-11 px-3 border text-primeColor text-sm outline-none border-gray-900 rounded"
              type="number"
              placeholder="Enter Amount"
            />
            <button className="w-full border my-2 py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont rounded">
              Stake
            </button>
            <p>Your Current rewards earned 2,000,000 PSYSL</p>
            <button className="w-full border my-2 py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont rounded">
              Claim Reward
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full bg-blue bg-opacity-40 my-2 border px-4 py-6 mr-2">
          <h4>Play the Shop to earn game</h4>
          <p>Your Current points earned 2,000,000 PSYSL</p>
          <Link to="/play">
            <button className="w-90% rounded border py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont b-20 my-5">
              <span className="mr-5"></span> Play <span className="mr-5"></span>
            </button>
          </Link>

        </div>
        <div className="  mx-auto border px-4 py-6 mr-2">

          <div className="w-full bg-ash mx-auto my-5 border px-4 py-6 mr-2">
            <h4>View Vendor Dashboard</h4>
            <p>Total products listed {vendorProducts.length}</p>
            <Link to="/vendorData">
              <button className="w-90% border rounded py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont b-20 my-5">
                <span className="mr-5"></span> View <span className="mr-5"></span>
              </button>
            </Link>
            <div className="w-full bg-ash my-2 border px-4 py-6 mr-2">
              <p>Your total sales made this week - {200}</p>
            </div>
          </div>
        </div>

      </div>
      <Banner />
      <span className="px-5"></span>
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default UserData;