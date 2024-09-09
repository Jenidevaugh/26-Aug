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
import { FaArrowAltCircleRight, FaPlus } from "react-icons/fa";
 

const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";



const VendorData = () => {

  //const [showMenu, setShowMenu] = useState(true);
  //const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [category1, setCategory1] = useState(false);
  const [banner, setBanner] = useState(false);
  const [sortVendor, setSortVendor] = useState([]);
  const [Orders, setOrders] = useState([]);
  const { address, isConnected } = useAccount();


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

       
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, );
 

  console.log(vendorProducts, 'vendor')
  console.log(address)

  return (
    <div className="w-full mx-auto">
      <Header />

      <h4>Your Vendor Dashboard </h4>

      <div className="w-full bg-ash mx-auto my-5 border px-4 py-6 mr-2 ">
        <h4 className="text-xl">Total Sales Made </h4> <hr />
        <div className="border my-2 px-4">
          <p> Net Sales {5}</p>
          <p> Pending Withdrawal {5}</p>

        </div>
        <div className="w-full hover:text-white bg-ash hover:bg-reddy hover:bg-opacity-20 my-2 border px-4 py-6 mr-2  duration-300 ">
          <p className="text-l "> Click to withdraw place whitdrawal </p>

          <Link Link to="/vendorData">
            <button className="w-90%  bg-blue hover:bg-black rounded sborder py-2 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont b-20 my-5">
              <span className="mr-5"></span> Withdraw <span className="mr-5"></span>
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full bg-ash mx-auto my-5 border px-4 py-6 mr-2 ">
        <h4>Listed Banners</h4>
        <p> Total listed {5}</p>

        <div className="w-full bg-ash my-2 border px-4 py-6 mr-2 ">
          <span>
            <Link to={"/products"}>
              <p>Click to view </p>
            </Link>
          </span>

          <div className="mt-4 py-4">
            <Banner />

          </div>
        </div>
      </div>


      <br></br>

      <div className="w-90 mx-auto border-4 border-blue-500 rounded-lg px-4 py-6 mx-4">
        <div className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-md">
          <h4 className="text-base">
            You have a total of {vendorProducts.length} Products Listed -
            <Link to={"/products"}>
            <span className="inline-flex gap-2 items-center border border-black-500 bg-blue text-white rounded-full py-1 px-4 ml-2 hover:bg-red-600 transition-colors duration-300 cursor-pointer">
            <FaArrowAltCircleRight/>  click to view</span>
            </Link>
          </h4>

          <Link to="/addProducts" className="flex items-center bg-blue-500 hover:bg-blue-700 text-red py-2 px-4 rounded-lg transition-colors duration-300">
          <span className="inline-flex gap-2 items-center border border-black-500 bg-blue text-white rounded-full py-1 px-4 ml-2 hover:bg-red-600 transition-colors duration-300 cursor-pointer">
          Add Product<FaPlus size={20}/></span>
          </Link>
        </div>
        <span className="w-full">
          <div className="w-full  my-2 border px-4 py-6 mr-2 ">
            <h4>Recent Orders Placed in last 7 days </h4>

            <div className="mt-4 py-4">
              <h1
                onClick={() => setCategory(!category)}
                className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
              >
                Your Current Orders Placed {" "}
                <span className="text-lg">{category ? "-" : "+"}</span>
              </h1>
              {category && (
                <motion.ul
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm border py-2 px-2 flex flex-col gap-1"
                >
                  <li className="headerSedenavLi">Order 1</li>
                  <li className="headerSedenavLi">Order 2</li>
                  <li className="headerSedenavLi">Order 3</li>
                  <li className="headerSedenavLi">Order 4</li>
                  <li className="headerSedenavLi">Order 5</li>
                </motion.ul>
              )} <hr />

            </div>

          </div>

        </span>


      </div> <br></br>
      <div className="w-full bg-ash mx-auto border px-4 py-6 mr-2 ">
        <h4>Total Products Listed {vendorProducts.length}  <span className="inline-flex items-center border border-black-500 bg-blue text-white rounded-full py-1 px-4 ml-2 hover:bg-red-600 transition-colors duration-300 cursor-pointer ">click to view</span></h4>

        <span className="w-full">
          <div className="w-full bg-ash my-2 border px-4 py-6 mr-2 ">
            <h4> View All your Orders Placed </h4>

            <div className="mt-4 py-4">
              <h1
                onClick={() => setCategory1(!category1)}
                className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
              >
                Your Current Orders Placed {" "}
                <span className="text-lg">{category1 ? "-" : "+"}</span>
              </h1>
              {category1 && (
                <motion.ul
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm border py-2 px-2 flex flex-col gap-1"
                >
                  <li className="headerSedenavLi">Order 1</li>
                  <li className="headerSedenavLi">Order 2</li>
                  <li className="headerSedenavLi">Order 3</li>
                  <li className="headerSedenavLi">Order 4</li>
                  <li className="headerSedenavLi">Order 5</li>
                </motion.ul>
              )} <hr />

            </div>

          </div>

        </span>


      </div>



      <span className="px-5"></span>

      <Footer />
      <FooterBottom />


    </div>
  );
};

export default VendorData;
