import { toast, ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import { hexToBigInt } from 'viem';
import { useEffect, useState } from "react"; 
import { createPublicClient, createWalletClient } from "viem";
import { CommerceABI } from "../../ABI/Commerce";
import { rollux } from "viem/chains";
import { custom, http } from "viem";
import { FaAccessibleIcon } from "react-icons/fa";
import { SYSLERC20 } from "../../ABI/SyslERC20";
import { SevenDaysstakingContractAddressRollux, SYSLERC20Token } from "../../constants/Addresses";
import { StakeERC20 } from "../../ABI/stakingERC20";
import { BigNumber } from "ethers";
 
const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";
const SYSLERC = "0xcfD1D50ce23C46D3Cf6407487B2F8934e96DC8f9";
const contract = SevenDaysstakingContractAddressRollux;




const StakeBAr = () => {
    const [data, setData] = useState(null);

    const [ProductGet, setProductIDGet] = useState([]);
    const [sortVendor, setSortVendor] = useState([]);
    const [Orders, setOrders] = useState([]);
    const [TokenBal, setTokenBal] = useState('');
    const { address, isConnected } = useAccount();
 
    const [claimingSTake, setclaimingSTake] = useState(false);

    const notifyStake1 = () => {
        toast("Your Tx has been submited successfully");
    
      };
    
      const notifyUnStake1 = () => {
        toast("Your Tx has been submited successfully");
    
      };
    
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
            //Get token balance 
            const balanceOf = await publicClient.readContract({
              //account: addressa,
              address: SYSLERC,
              abi: SYSLERC20,
              functionName: 'balanceOf',
              args: [addressa]
            });
    
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
    
            console.log('response:', balanceOf.toString());
    
            setSortVendor(getProducts);
            setOrders(getBuyerOrders);
            setTokenBal(balanceOf.toString().slice(0, -18).toLocaleString());
    
    
            const earlyUnstakeFee = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getEarlyUnstakeFeePercentage',
            });
    
            // Fetch other required data...
    
            const getMinimumStakingAmount = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getMinimumStakingAmount',
            });
    
            // Convert BigInt to a regular number
            const feeValue = Number(earlyUnstakeFee);
    
            // Multiply the value by 100
            const multipliedValue = feeValue / 100;
    
    
    
            //GET TOTAL STAKED TOKENS
            const getTotalStakedTokens = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getTotalStakedTokens',
    
            });
    
            //export const getTotalStakedFront = getTotalStakedTokens;
    
            //GET TOTAL STAKER
            const getTotalUsers = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getTotalUsers',
    
            });
    
    
    
            //GET MINIMUM STAKING AMOUNT
            const getMaxStakingTokenLimit = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getMaxStakingTokenLimit',
    
            });
            const getUser = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getUser',
              args: [addressa],
            });
    
            // Fetch other required data...
    
            const getStakeDays = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getStakeDays',
    
            });
    
            // Convert the value to a regular number (assuming it's a BigInt)
            const daysInSeconds = Number(getStakeDays);
    
            // Convert seconds to days (1 day = 24 * 60 * 60 seconds)
            const days = daysInSeconds / (24 * 60 * 60);
    
    
            // Fetch other required data...
    
            const getUserEstimatedRewards = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getUserEstimatedRewards',
            });
    
            // Convert the BigInt value to a regular number
            const rewards = Number(getUserEstimatedRewards);
    
            // Fetch other required data...
    
            const stakeEndDate_ = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getStakeEndDate',
            });
    
            const getAPY = await publicClient.readContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'getAPY',
            });
    
            //console.log(getAPY)
            // Convert the stake end date value to a regular number (assuming it's a BigInt)
            const endDateValue = Number(stakeEndDate_);
    
    
            // Get the current time in milliseconds
            const currentTime = Date.now();
    
    
            // console.log (getUserEstimatedRewards)
    
            const stakeStatusMessage = endDateValue < currentTime ? "Stake has ended" : "Stake is still active";
    
            // Store the fetched data in the state
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
              getTotalUsers, stakeStatusMessage
              // Include other data in the object...
            });
    
    
    
           
            // Log all products (and any errors)
            //   console.log('Products response:', productPromises);
    
    
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchData();
      }, []);
    

      const handleStake = async () => {


        const publicClient = createPublicClient({
            chain: rollux,
            transport: http('https://rpc.rollux.com')
          });
      
          const walletClient = createWalletClient({
            chain: rollux,
            transport: custom(window.ethereum)
          });

        setclaimingSTake(true);
        try {
          // Get and store address
          const [addressa] = await walletClient.getAddresses();
          
          // Convert inputValue to BigInt with proper scaling
          const inputBigInt = BigNumber(inputValue + "000000000000000000");
          
          // Call approve function
          const approve = await walletClient.writeContract({
            account: addressa,
            address: SYSLERC20Token,
            abi: SYSLERC20,
            functionName: 'approve',
            args: [contract, inputBigInt],
          });
      
          const confirtm = hexToBigInt(approve);
    
          // Get current allowance
          const allowance = await walletClient.readContract({
            address: SYSLERC20Token,
            abi: SYSLERC20,
            functionName: 'allowance',
            args: [addressa, contract],
          });
      
          // Check if the approved amount is sufficient
          if ((confirtm)) {
            // Call stake function if allowance is sufficient
            const stake = await walletClient.writeContract({
              account: addressa,
              address: contract,
              abi: StakeERC20,
              functionName: 'stake',
              args: [inputBigInt],
            });
      
            notifyStake1();
    
            console.log(hexToBigInt(allowance))
    
            // console.log("Reward claimed successfully:", stake);
          } else {
            toast.error('Insufficient allowance for staking');
          }
      
        } catch (error) {
          toast.error(error.code || 'Transaction Failed');
          // console.error("Error claiming reward:", error);
        }
      
        setclaimingSTake(false);
      };
      
    
      const [claimingUnSTake, setclaimingUnSTake] = useState(false);
      const [inputValue, setInputValue] = useState('');
    
      const handleUnStake = async () => {

        const publicClient = createPublicClient({
            chain: rollux,
            transport: http('https://rpc.rollux.com')
          });
      
          const walletClient = createWalletClient({
            chain: rollux,
            transport: custom(window.ethereum)
          });

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

        const publicClient = createPublicClient({
            chain: rollux,
            transport: http('https://rpc.rollux.com')
          });
      
          const walletClient = createWalletClient({
            chain: rollux,
            transport: custom(window.ethereum)
          });

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
    
    return(
        <>
          {data && data.days && data.multipliedValue && data.getTotalUsers && data.getTotalStakedTokens && data.getUser && data.stakeStatusMessage && data.rewards ? (
        <div className="w-90 mx-auto border-4 border-blue-500 rounded-lg px-1 py-6 mx-4">
          <div className="flex flex-wrap justify-between items-start p-4 border rounded-lg bg-white shadow-md">
            <div className="flex flex-col w-full md:w-1/3 space-y-2">
              <h4 className="text-lg font-semibold">Your current stake info</h4>
              <h5> Lock period: {data.days.toString()} Days  </h5>
              <h5> Early unstake fee:  {data.multipliedValue.toString()}% </h5>

              <h5> Total No. of Stakers: {data.getTotalUsers.toString()}  </h5>
              <h5> Total staked tokens: {data.getTotalStakedTokens.toString().slice(0, -18)} SYSL  </h5>
              <p>Your SYSL Balance is {TokenBal} SYSL</p>
              <h4 className="text-lg font-semibold">Your Current Stake position</h4>
              <p>Your Total staked {data.getUser.stakeAmount.toLocaleString().slice(0, -24)} SYSL</p>
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
              <button className="w-full border my-2 py-2 bg-blue hover:bg-black duration-300 text-white text-lg font-titleFont rounded" onClick={handleStake} disabled={data.stakeStatusMessage === "Stake has ended" || claimingSTake}> {claimingSTake ? 'Approving...' : 'Stake'}</button>

              <p>Your Current rewards earned {data.rewards.toLocaleString().slice(0, -24)}</p>
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


        
        </>
    )
}

export default StakeBAr;