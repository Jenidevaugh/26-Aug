import playIMG from "./imageee.png";
import { useDisconnect, } from "wagmi";
import "./user.css";
import { createClient } from "@supabase/supabase-js";
import { toast, ToastContainer } from "react-toastify";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { hexToBigInt } from 'viem';
import { useEffect, useState } from "react";
import ProfileLog from "./ProfileLog";
import { GetProducts } from "../Shop/GetProd";
import { createPublicClient, createWalletClient } from "viem";
import { CommerceABI } from "../../ABI/Commerce";
import { rollux } from "viem/chains";
import { custom, http } from "viem";
import { FaAccessibleIcon } from "react-icons/fa";
import { SYSLERC20 } from "../../ABI/SYSLERC20";
import { SevenDaysstakingContractAddressRollux, SYSLERC20Token } from "../../constants/Addresses";
import { StakeERC20 } from "../../ABI/stakingERC20";
import { BigNumber } from "ethers";
import StakeBAr from "./StakeBar";



const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";
const SYSLERC = "0xcfD1D50ce23C46D3Cf6407487B2F8934e96DC8f9";
const contract = SevenDaysstakingContractAddressRollux;
const supabaseUrl = "https://fofimcnyyiryquyxyaki.supabase.co"
const supabaseKey1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZmltY255eWlyeXF1eXh5YWtpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTUzOTUwNiwiZXhwIjoyMDM3MTE1NTA2fQ.oIAUWKmNhSuVq03fXaT_Y4MfWukaUKC9SkF7UjxJNJE"


const UserData = () => {
  const navigate = useNavigate(); // initialize useNavigate
  const [Orders1, setOrders1] = useState([]);
  const [ProductGet, setProductIDGet] = useState([]);
  const [sortVendor, setSortVendor] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [TokenBal, setTokenBal] = useState('');
  const [data, setData] = useState(null);

  const { disconnect } = useDisconnect();
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



  const [vendorProducts, setVendorProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const publicClient = createPublicClient({
        chain: rollux,
        transport: http('https://rpc.rollux.com'),
      });

      const walletClient = createWalletClient({
        chain: rollux,
        transport: custom(window.ethereum),
      });

      const [addressa] = await walletClient.getAddresses();

      try {
        // Get token balance
        const balanceOf = await publicClient.readContract({
          address: SYSLERC,
          abi: SYSLERC20,
          functionName: 'balanceOf',
          args: [addressa],
        });

        const getProducts = await publicClient.readContract({
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getAllProducts',
        });

        const getBuyerOrders = await publicClient.readContract({
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'getBuyerOrders',
          args: [addressa],
        });

        console.log('response:', balanceOf.toString());

        setSortVendor(getProducts);
        setOrders(getBuyerOrders);
        setTokenBal(balanceOf.toString().slice(0, -18).toLocaleString());

        const earlyUnstakeFee = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getEarlyUnstakeFeePercentage',
        });

        const getMinimumStakingAmount = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getMinimumStakingAmount',
        });

        const feeValue = Number(earlyUnstakeFee);
        const multipliedValue = feeValue / 100;

        const getTotalStakedTokens = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getTotalStakedTokens',
        });

        const getTotalUsers = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getTotalUsers',
        });

        const getMaxStakingTokenLimit = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getMaxStakingTokenLimit',
        });

        const getUser = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getUser',
          args: [addressa],
        });

        const getStakeDays = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getStakeDays',
        });

        const daysInSeconds = Number(getStakeDays);
        const days = daysInSeconds / (24 * 60 * 60);

        const getUserEstimatedRewards = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getUserEstimatedRewards',
        });

        const rewards = Number(getUserEstimatedRewards);

        const stakeEndDate_ = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getStakeEndDate',
        });

        const getAPY = await publicClient.readContract({
          address: contract,
          abi: StakeERC20,
          functionName: 'getAPY',
        });

        const endDateValue = Number(stakeEndDate_);
        const currentTime = Date.now();
        const stakeStatusMessage = endDateValue < currentTime ? "Stake has ended" : "Stake is still active";

        setData({
          getAPY,
          earlyUnstakeFee,
          getUser,
          rewards,
          getMaxStakingTokenLimit,
          getMinimumStakingAmount,
          getTotalStakedTokens,
          multipliedValue,
          currentTime,
          endDateValue,
          days,
          getTotalUsers,
          stakeStatusMessage,
        });

      } catch (error) {
        console.error(error);
      }
    }

    fetchData(); // Fetch data immediately on mount

    const intervalId = setInterval(fetchData, 30000); // Set interval to fetch data every 30 seconds

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  console.log(vendorProducts, 'vendor')
  console.log(data)

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
  const [claimingSTake, setclaimingSTake] = useState(false);


  const notifyStake1 = () => {
    toast("Your Tx has been submited successfully");

  };

  const notifyUnStake1 = () => {
    toast("Your Tx has been submited successfully");

  };

  const approve = async () => {
    setclaimingSTake(true);
    const publicClient = createPublicClient({
      chain: rollux,
      transport: http('https://rpc.rollux.com')
    });

    const walletClient = createWalletClient({
      chain: rollux,
      transport: custom(window.ethereum)
    });

    const [addressa1] = await walletClient.getAddresses();
    ////Approve Tokens
    const checkApprove1 = await publicClient.readContract({
      account: addressa1,
      address: SYSLERC20Token,
      abi: SYSLERC20,
      functionName: 'allowance',
      args: [addressa1, contract],
    });

    // console.log(checkApprove);

    try {


      const checkApprove = checkApprove1;

      const approveValue = hexToBigInt(inputValue + "000000000000000000");

      console.log("check", checkApprove);
      console.log(approveValue);

      if (checkApprove > approveValue) {

        console.log("Check allowance before calling stake")

        handleStake();

      } else {
        const approve = await walletClient.writeContract({
          account: addressa1,
          address: SYSLERC20Token,
          abi: SYSLERC20,
          functionName: 'approve',
          args: [contract, hexToBigInt(inputValue + "000000000000000000")],
        });

        const intervalId = setInterval(async () => {

          const count = await publicClient.getTransactionConfirmations({
            hash: approve
          });

          console.log(count);

          if (count > 0) {
            clearInterval(intervalId);
            handleStake();
          }

        }, 700); // Check interval
      }
      //Get and store address

      notifyStake1();

      //  console.log("Reward claimed successfully:", stake);

    } catch (error) {
      toast.error(error.code || 'Transaction Failed  ');

      //   console.error("Error claiming reward:", error);
      // show error message on console
    }
  };

  const handleStake = async () => {
    setclaimingSTake(true);
    try {
      // Get and store address
      const [addressa] = await walletClient.getAddresses();

      // Convert inputValue to BigInt with proper scaling
      const inputBigInt = hexToBigInt(inputValue + "000000000000000000");

      // Call approve function
      //   const approve = await walletClient.writeContract({
      //     account: addressa,
      //     address: SYSLERC20Token,
      //     abi: SYSLERC20,
      //     functionName: 'approve',
      //     args: [contract, inputBigInt],
      //   });
      //
      //   const confirtm = hexToBigInt(approve);

      // Get current allowance
      //   const allowance = await walletClient.readContract({
      //     address: SYSLERC20Token,
      //     abi: SYSLERC20,
      //     functionName: 'allowance',
      //     args: [addressa, contract],
      //   });

      const stake = await walletClient.writeContract({
        account: addressa,
        address: contract,
        abi: StakeERC20,
        functionName: 'stake',
        args: [inputBigInt],
      });

      notifyStake1();



    } catch (error) {
      toast.error('Insufficient allowance for staking');
      toast.error(error.code || 'Transaction Failed');
      // console.error("Error claiming reward:", error);
    }

    setclaimingSTake(false);
  };


  const [claimingUnSTake, setclaimingUnSTake] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleUnStake = async () => {
    setclaimingUnSTake(true);
    try {


      //Get and store address
      const [addressa] = await walletClient.getAddresses();

      const UnsStake = await walletClient.writeContract({
        account: addressa,
        address: contract,
        abi: StakeERC20,
        functionName: 'unstake',
        args: [hexToBigInt(inputValue + "000000000000000000")]
      });

      notifyUnStake1()

      console.log("Reward claimed successfully:", UnsStake);

    } catch (error) {
      toast.error(error.code || 'Transaction Failed  ');

      console.error("Error claiming reward:", error);

    }

    setclaimingUnSTake(false);

  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [claiming, setClaiming] = useState(false);

  const handleClaimReward = async () => {
    setClaiming(true);
    try {


      //Get and store address
      const [addressa] = await walletClient.getAddresses();

      const claimRewardResult = await walletClient.writeContract({
        account: addressa,
        address: contract,
        abi: StakeERC20,
        functionName: 'claimReward',
      });

      notifyUnStake1()

      console.log("Reward claimed successfully:", claimRewardResult);
      // Optionally, perform further actions after claiming the reward
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error(error.code || 'Transaction Failed  ');

      // Handle error, e.g., show error message to the user
    }

    setClaiming(false);

  };



  //gET uSER pOINTS
  const [pointsDb, setPointsDb] = useState('');

  const wholeNumberPoints = Math.round(pointsDb).toLocaleString();

  async function GetUserPoints() {

    const supabase = createClient(supabaseUrl, supabaseKey1);

    try {
      let { data: Gameplay, error } = await supabase
        .from('Gameplay')
        .select('points')
        .eq('address', address);

      // console.log(Gameplay)

      if (error) {
        //  throw error;
      }

      if (Gameplay.length > 0) {
        setPointsDb(Gameplay[0].points);
      } else {
        // console.log('no points in DB fro Address')
        setPointsDb(0); // Set to 0 if no data found
      }

      // console.log(Gameplay);
    } catch (error) {
      //console.error(error);
    }
  };


  useEffect(() => {
    // handleCheckout();
    GetUserPoints();
  }, [])


  return (
    <div className="bg-white ">
      <Header />

      {/*  <div>
        <div className="bg-blue bg-opacity-40 w-full mx-auto my-5 border px-4 py-6">
          <div>
            <ProfileLog />
          </div>
        </div>
        </div>*/}

      <div>
        <div className="w-full mt-4 flex gap-4rounded-lg py-2 px-2 bg-blue">
          {address && isConnected && (
            <>
              <p className="text-base text-white mt-2">
                Wallet connected: {address.slice(0, 5)} <br />
              </p>
  <button className="my-2 mx-2 py-2 p-2 bg-black hover:bg-black duration-300 text-white " onClick={disconnect} type="button">
          Disconnect Wallet
        </button>
            </>
          )}
          {!address && (
            <p>NUll</p>
          )}
        </div>
      
      </div>


      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">


        <div className="w-full mx-auto my-5 border px-4 py-6">
          <h4 className="flex gap-2"> <FaAccessibleIcon />Your Current Pending Orders </h4>

          <div className="w-full bg-ash bg-opacity-40  Mix1 my-2 border px-4 py-6">

            <div>
              {Orders.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg my-2 p-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                >
                  <p className="text-gray-500 mb-2 gap-1">Order No.: {product.id.toString()}</p>
                  <h3 className="text-lg font-semibold">Buyer: {product.buyer === address ? "You" : "Somethig May be Wrong"}</h3>
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


      {data ? (
        <div className="w-90 mx-auto border-4 border-blue-500 rounded-lg px-1 py-6 mx-4">
          <div className="flex flex-wrap justify-between items-start p-4 border rounded-lg bg-white shadow-md">
            <div className="flex flex-col w-full md:w-1/3 space-y-2">
              <h4 className="text-lg font-semibold">📜 Stake Pool info</h4>
              <h5> Lock period: {data.days.toString()} Days  </h5>
              <h5> Early unstake fee:  {data.multipliedValue.toString()}% </h5>

              <h5> Total No. of Stakers: {data.getTotalUsers.toString()}  </h5>
              <h5> Total staked tokens: {Number(data.getTotalStakedTokens.toString().slice(0, -18)).toLocaleString()}  SYSL  </h5>
              <p>Your SYSL Balance is {TokenBal} SYSL</p>

              <h4 className="text-lg font-semibold">🏆Your Current Stake position</h4>
              <p>Your Total staked {Number(data.getUser.stakeAmount.toString().slice(0, -18)).toLocaleString()} SYSL</p>
              <p>Rewards Claimed {Number(data.getUser.rewardsClaimedSoFar.toString().slice(0, -18)).toLocaleString()} SYSL</p>
              <h5> Status: {data.stakeStatusMessage} </h5>

            </div>

            <div className="my-2">
              <input
                className="w-full h-11 px-3 border text-primeColor text-sm outline-none border-gray-900 rounded"
                type="number"
                placeholder="Enter Amount"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className="w-full border my-2 py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont rounded" onClick={approve} disabled={data.stakeStatusMessage === "Stake has ended" || claimingSTake}> {claimingSTake ? 'Approving...' : 'Stake'}</button>

              <p>Your Current rewards earned {Number(data.rewards.toString().slice(0, -18)).toLocaleString()}</p>
              <button className="w-full border my-2 py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont rounded" onClick={handleClaimReward}>  {claiming ? 'Claiming...' : 'Claim Reward'}</button>
              <button className="w-full border my-2 py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont rounded" onClick={handleUnStake}>  {claimingUnSTake ? 'Unstaking...' : 'Unstake'}</button>

            </div>
          </div>
        </div>
      ) : (
        <div className="w-90 mx-auto border-4 border-blue-500 rounded-lg px-1 py-36 px-12 mx-4">
          <p className="text-center">Loading Stake info, Please wait</p>
        </div>
      )}


      {/*<StakeBAr/>*/}



      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full bg-blue my-2 border px-4 py-6">
        {/* Content Section */}
        <div className="lg:w-2/3">
          <h4>Play the Shop to earn game</h4>
          <p>
            Your Current points earned <span className="text-reddy">{wholeNumberPoints}</span> Points
          </p>
          <Link to="/play">
            <button className="w-40 rounded border py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont b-20 my-5">
              <span className="mr-5"></span> Play <span className="mr-5"></span>
            </button>
          </Link>
        </div>
        {/* Image Section */}
        <div className="lg:w-1/3 lg:ml-4 flex justify-center">
          <img src={playIMG} alt="Play" className="w-40 object-fit" />
        </div>
      </div>
      <div>

        <div className="mx-auto border px-4 py-6 mr-2">
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
        <ToastContainer closeButton={true} position="top-right" />
      </div>

      <Banner />
      <span className="px-5"></span>
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default UserData;