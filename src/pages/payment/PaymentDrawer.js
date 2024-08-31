import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { useDisconnect, useConnect } from 'wagmi';
import { WalletButton } from '@rainbow-me/rainbowkit';
import { Bounce, toast, ToastContainer } from 'react-toastify'; // Optional: For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight, FaCheck, FaShoppingBag } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { createPublicClient, createWalletClient } from "viem";
import { CommerceABI } from "../../ABI/Commerce";
import { http, custom } from "viem";
import { rollux } from "viem/chains";
import { useSelector } from "react-redux";
import { hexToBigInt, bytesToBigInt } from "viem";
//import { ethers } from 'ethers';
import { parseEther } from "viem";
import { estimateGas } from "viem/actions";
//import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
 import { privateKeyToAccount } from "viem/accounts";





function PaymentDraweable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { disconnect } = useDisconnect();
    const { address, isConnected, isConnecting, isDisconnected } = useAccount();
    const [open, setOpen] = useState(false);
    const [wasConnected, setWasConnected] = useState(false);
    const productsCheck = useSelector((state) => state.orebiReducer.products);

    //COnnect Public client for viem
const publicClient = createPublicClient({
    chain: rollux,
    transport: http('https://rpc.ankr.com/rollux')
});


const walletClient = createWalletClient({
    account: address,
    chain: rollux,
    transport: custom(window.ethereum)
});
    const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

    useEffect(() => {
        if (isConnected && !wasConnected) {
            //toast.success('Wallet Connected');
            setWasConnected(true);
        } else if (isDisconnected && wasConnected) {
            // toast.warn('Wallet Disconnected');
            setWasConnected(false);
        }
    }, [isConnected, isDisconnected, wasConnected]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleTestCheckout = async () => {

        const [addressa] = await walletClient.getAddresses();

        const buyProduct = await walletClient.writeContract({
            account: addressa,
            address: Commercecontract,
            abi: CommerceABI,
            functionName: 'buyProduct',
            args: [1],
        });

        console.log(buyProduct, "Should be the checkout hash")
        //sendTransaction({
        //  to: '0x69d8a5e104fbf6ccb8f4f71b32a8810526d2f25c',
        //  value: parseEther(totalPrice),
        //});
    };

    //Need to check token price at first 
    const checkTokenPrice = async (price) => {
        const [addressa] = await walletClient.getAddresses();

        // Retrieve the token equivalent price from the contract by passing the price
        const convertPriceToTokenEquivalent = await publicClient.readContract({
            account: addressa,
            address: Commercecontract,
            abi: CommerceABI,
            functionName: 'convertPriceToTokenEquivalent',
            args: [price],  // Pass the product price here
        });
       
        // Convert the result to BigInt (if necessary) and return as a string
        const tokenPriceString = convertPriceToTokenEquivalent;
        const tokenPriceBigInt = hexToBigInt(tokenPriceString);
        // const tokenPriceBigInt = ethers.BigNumber.from(tokenPriceString).toString();

        console.log(tokenPriceBigInt.toString(), `Token equivalent for price: ${price}`);
        return tokenPriceBigInt
    };

  const handleTestCheckoutMany = async () => {
      const [addressa] = await walletClient.getAddresses();
 
      // Iterating over each product in the productsCheck array before passed to contract
      for (const product of productsCheck) {
          const { _id, price, quantity } = product;
 

    //      const bundlerClient = createBundlerClient({
    //        address, 
    //        publicClient,
    //        transport: custom(window.ethereum),
    //      })
           
          for (let i = 0; i < quantity; i++) {
              try {
                  // Will have to Check the token price for all product  in Cart for price and convert it to a string
                  const tokenPrice = await checkTokenPrice(price);
 
                  const estimate = await publicClient.getGasPrice();
 
                  console.log(estimate.toString(), 'gas fees');
 
          
                  const buyProduct = await walletClient.writeContract({
                      account: addressa,
                      address: Commercecontract,
                      abi: CommerceABI,
                      functionName: 'buyProduct',
                      args: [_id],
                     // nonce: '28',
                       value: parseEther(tokenPrice.toString()),
                       maxFeePerGas: ('400000000'),
                      gas: ('3000000'),
                      
                      
                  });
 

                  const proceed = walletClient.prepareTransactionRequest(buyProduct);
 
                  console.log(buyProduct, `Checkout hash for product ID: ${_id}`);
              } catch (error) {
                  console.error(`Error processing product ID: ${_id}`, error);
              }
          }
      }
  };

  const handleTestCheckoutMany1 = async () => {
      const [addressa] = await walletClient.getAddresses();
 

 //   const bundlerClient = createBundlerClient({
 //     publicClient,
 //     transport: http(''),
 //   });
 //   

      const owner = privateKeyToAccount('0xdd5d5c24083341d6472668bcbd9ceb2e189ae88a966d071da1e1b7ac958f90f1')


   //  const account = await toCoinbaseSmartAccount({ 
   //    createPublicClient, 
   //    owners: [owner]
   //  }) 
   //  // Iterating over each product in the productsCheck array before passed to contract
      for (const product of productsCheck) {
          const { _id, price, quantity } = product;
 

      //  const bundlerClient = createBundlerClient({
      //    address, 
      //    publicClient,
      //    transport: custom(window.ethereum),
      //  })
           
          for (let i = 0; i < quantity; i++) {
              try {
                  // Will have to Check the token price for all product  in Cart for price and convert it to a string
                  const tokenPrice = await checkTokenPrice(price);
 
                  const estimate = await publicClient.getGasPrice();
 
                  console.log(estimate.toString(), 'gas fees');
 
          
                  const buyProduct = await walletClient.writeContract({
                      account: addressa,
                      address: Commercecontract,
                      abi: CommerceABI,
                      functionName: 'buyProduct',
                      args: [_id],
                     // nonce: '28',
                       value: parseEther(tokenPrice.toString()),
                       estimateGas: (estimate),
                      gas: ('300000000'),
                      
                  });
 

                  const proceed = walletClient.prepareTransactionRequest(buyProduct);
 
                  console.log(buyProduct, `Checkout hash for product ID: ${_id}`);
              } catch (error) {
                  console.error(`Error processing product ID: ${_id}`, error);
              }
          }
      }
  };

//const handleTestCheckoutMany = async () => {
//    const [addressa] = await walletClient.getAddresses();
//
//    for (const product of productsCheck) {
//        const { _id, price, quantity } = product;
//
//        for (let i = 0; i < quantity; i++) {
//            try {
//                const tokenPrice = await checkTokenPrice(price);
//
//                // Estimate gas for the transaction
//                const estimatedGas = await publicClient.estimateGas({
//                    account: addressa,
//                    address: Commercecontract,
//                     value: parseEther(tokenPrice.toString()),
//                });
//
//                console.log(`Estimated gas for product ID: ${_id} is ${estimatedGas.toString()}`);
//
//                  console.log(estimateGas.toString(), 'gas fees');
//
//                // Execute the transaction with the estimated gas limit
//                const buyProduct = await walletClient.writeContract({
//                    account: addressa,
//                    address: Commercecontract,
//                    abi: CommerceABI,
//                    functionName: 'buyProduct',
//                    args: [_id],
//                    value: parseEther(tokenPrice.toString()),
//                    gasLimit: estimatedGas,  // Use the estimated gas limit
//                    maxPriorityFeePerGas: '300000000' // Adjust if needed
//                });
//
//                console.log(buyProduct, `Checkout hash for product ID: ${_id}`);
//            } catch (error) {
//                console.error(`Error processing product ID: ${_id}`, error);
//            }
//        }
//    }
//};

    console.log(productsCheck);

    return (
        <div className="flex">

            <div className="w-52 h-10 p-1 bg-blue text-center text-white text-lg mt-4 hover:bg-black border rounded duration-300">
                <button onClick={toggleDrawer}>{isConnected ? 'Pay Now' : 'Connect Wallet'}</button>
            </div>



            <Drawer className="py-4 h-5"
                anchor={isMobile ? "bottom" : "left"}
                open={open}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: isMobile ? "100%" : 400,
                    },
                }}
            >
                <br></br>
                <br></br>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />

                {isConnecting ? (
                    <div className="flex justify-center items-center h-full">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>
                        <div className="mb-4 ">{!productsCheck ? '🛒 Proceed to Checkout' : '🤔 You have not products to Checkout'}</div>

                        <div className='mx-2 my-2 text-white w-fit p-2 h-50 bg-blue rounded-lg'>
                            <h1>To confirm payment to metamask wallet</h1>

                            <div className="m-2 y-2 flex gap-2 items-center">
                                Confirmed transactions: <FaCheck /> {'1'} / {'5'}
                            </div>
                        </div>
                    </div>

                )}

                <div className="m-2 y-2 flex gap-2 items-center">
                    Confirmed transactions: <FaCheck color="green" /> <span className="flex gap-1 items-center">  {'1'} / <FaShoppingBag colorInterpolationFilters="RGB" /> {'5'} </span>
                </div>

 
                <button onClick={handleTestCheckoutMany} className="w-52 h-10 bg-blue mb-1 ml-1 text-white text-lg mt-4 hover:bg-black border rounded duration-300">
                    Pay Now
                </button>
 
            </Drawer>
        </div>
    );
}

export default PaymentDraweable;