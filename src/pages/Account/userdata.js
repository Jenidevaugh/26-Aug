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



const UserData = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate(); // initialize useNavigate
  const [Orders, setOrders] = useState([]);


  const publicClient = createPublicClient({
    chain: rollux,
    transport: http()
  });
  
  
  const walletClient = createWalletClient({
    chain: rollux,
    transport: custom(window.ethereum)
  });
  
  useEffect(() => {
    if (!isConnected || !address) {
      navigate('/signin'); // redirect to signin page if not connected or no address
    }
  }, [isConnected, address, navigate]);


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
        const getBuyerOrders = await publicClient.readContract({
          account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getBuyerOrders',
          args: [addressa]
        });

        setOrders(getBuyerOrders);

        console.log(getBuyerOrders);

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // console.log(address);

  return (
    <div className="bg-cornsilk ">
      <Header />

      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">

        <div className="bg-blue bg-opacity-40 w-full md:w-1/2 mx-auto my-5 border px-4 py-6">
          <div>
            <ProfileLog />
          </div>
        </div>

        <div className="w-full md:w-1/2 mx-auto my-5 border px-4 py-6">
          <h4>Wallet Balance</h4>
          <p>Total  </p>
          <div className="w-full bg-ash bg-opacity-40  Mix1 my-2 border px-4 py-6">
            <h4>Your Current Pending Orders</h4>

            <div>
              {Orders.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg my-2 p-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                 > 
                  <h3 className="text-lg font-semibold">Buyer: {product.buyer == address? "You" : "Somethig May be Wrong"}</h3>
                  <p className="text-gray-500 mb-2">productId: {product.productId.toString()}</p>
                  <p className="text-gray-500">  Completed: {product.state === 0 ? "No" : product.state === 1 ? "Yes" : "Unknown"}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>

      </div>


      <div className="w-full x-auto px-2 ">

        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">

          <div className="bg-blue bg-opacity-40 w-full md:w-1/2 mx-auto my-5 border px-4 py-6">
            <div>
              <h4>Your current stake info</h4>
              <p>Total Staked tokens in stake pool</p>
              <div className="w-full bg-opacity-50  bg-ash my-2 border px-4 py-6">
                <p>Your SYSL Balance is 20 SYSL</p>
                <p>PSYS Balance is 20 PSYS</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mx-auto my-5 border px-4 py-6">
            <h4>Stake your SYSL, earn PSYS</h4>
            <p>Total Staked tokens is</p>
            <div className="w-full bg-ash bg-opacity-40  Mix1 my-2 border px-4 py-6">
              <h4>Your Current Stake position</h4>
              <input
                className="w-full md:w-52 h-11 px-3 border text-primeColor text-sm outline-none border-gray-900 rounded"
                type="number"
                placeholder="Enter Amount"
              />
              <button className="w-full md:w-90% border py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont my-2 rounded ">
                Stake
              </button>
              <p>Your Current rewards earned 2,000,000 PSYSL</p>
              <button className="w-full md:w-90% border py-2 bg-blue hover:bg-blue duration-300 text-white text-lg font-titleFont my-2 rounded">
                Claim Reward
              </button>
            </div>
          </div>

        </div>

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
            <p>Total products listed {20}</p>
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