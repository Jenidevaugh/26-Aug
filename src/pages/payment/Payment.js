import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import ConnectedAddress from "../Account/connectedAddress";
import { FaBiohazard, FaCoins, FaGamepad, FaInfo, FaShippingFast, FaWallet } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { FormControl, RadioGroup, Radio } from "@mui/material";
//import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { CommerceABI } from "../../ABI/Commerce";
import { createWalletClient, createPublicClient } from "viem";
import { rollux } from "viem/chains";
import { custom, http } from "viem";
import PaymentDraweable from "./PaymentDrawer";

const Payment = () => {

  
const publicClient = createPublicClient({
  chain: rollux,
  transport: http()
});


const walletClient = createWalletClient({
  chain: rollux,
  transport: custom(window.ethereum)
});

  const products = useSelector((state) => state.orebiReducer.products);

  //const [shippingCharge, setShippingCharge] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [toPays, settoPays] = useState("");

  //state to store amount of tokens to be paid
  const [toPaysToken, settoPaysToken] = useState("");

  const totalAmted = useSelector((state) => state.orebiReducer.totalAmount);
  const toPay = checkOut + totalAmted;
  const { address, isConnected } = useAccount();
  const [pointsDb, setPointsDb] = useState('');
  const [totalAmt1, setTotalAmt1] = useState('');

  const Commercecontract = "0x2e0b6cb6dB7247f132567d17D0b944bAa503d21A";

  useEffect(() => {
    if (totalAmted <= 200) {
      setCheckout(0);
    } else if (totalAmted <= 400) {
      setCheckout(0);
    } else if (totalAmted > 401) {
      setCheckout(0);
    }
  }, [totalAmted]);


  useEffect(() => {
    // Calculate the total amount by summing up the price * quantity for each product
    const total = products.reduce((accumulator, item) => {
      const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
      const itemQuantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is an integer
      return accumulator + itemPrice * itemQuantity;
    }, 0);

    setTotalAmt1(total + checkOut);
  }, [products]);

  console.log(totalAmt1);

  const supabaseUrl = "https://fofimcnyyiryquyxyaki.supabase.co"
  const supabaseKey1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZmltY255eWlyeXF1eXh5YWtpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTUzOTUwNiwiZXhwIjoyMDM3MTE1NTA2fQ.oIAUWKmNhSuVq03fXaT_Y4MfWukaUKC9SkF7UjxJNJE"


  //USeEffect to check token price 
  useEffect(() => {
    async function fetchTokenData() {
      const [addressa] = await walletClient.getAddresses();

      try {

        //Convert total price for all subtotal
        const convertPriceToTokenEquivalent = await publicClient.readContract({
          account: addressa,
          address: Commercecontract,
          abi: CommerceABI,
          functionName: 'convertPriceToTokenEquivalent',
          args: [totalAmt1],
        });

        console.log(convertPriceToTokenEquivalent.toString());

        settoPaysToken(convertPriceToTokenEquivalent);
        //  setProductsCount(getProductsCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTokenData();
  }, []);


  //Test Checkout
  //Test checkout should be able to checkout each individual products by their individual products byt their
  //ID's (eg lets assume, 2 products quantities are in cart. there souold be simulataneous checkout for each 
  //products untill all the amount have been signed)

  const checkTokenPrice = async () => {

    const [addressa] = await walletClient.getAddresses();

    const convertPriceToTokenEquivalent = await publicClient.readContract({
      account: addressa,
      address: Commercecontract,
      abi: CommerceABI,
      functionName: 'convertPriceToTokenEquivalent',
      args: ['price'],
    });

    console.log(convertPriceToTokenEquivalent, "Should be the checkout hash")
    //sendTransaction({
    //  to: '0x69d8a5e104fbf6ccb8f4f71b32a8810526d2f25c',
    //  value: parseEther(totalPrice),
    //});
  };

  const handleTestCheckout = async () => {

    const [addressa] = await walletClient.getAddresses();

    const tokenPrice = '1';

    const buyProduct = await walletClient.writeContract({
      account: addressa,
      address: Commercecontract,
      abi: CommerceABI,
      functionName: 'buyProduct',
      args: [1],
      value: parseEther(tokenPrice),

    });

    console.log(buyProduct, "Should be the checkout hash")
    //sendTransaction({
    //  to: '0x69d8a5e104fbf6ccb8f4f71b32a8810526d2f25c',
    //  value: parseEther(totalPrice),
    //});
  };

  //Get User point from Supabase whhich can be partially used to fulfill an order
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
  }

  //Handle checkout
  const { sendTransaction } = useSendTransaction()

  const handleCheckout = () => {
    //settoPays(totalPrice);

    sendTransaction({
      to: '0x69d8a5e104fbf6ccb8f4f71b32a8810526d2f25c',
      value: parseEther(toPaysToken),
    });
  };

  //const handlePriceCheck = () => {
  //  settoPays(totalPrice);
  //};

  useEffect(() => {
    // handleCheckout();
    GetUserPoints();
  }, [pointsDb, toPays])

  const wholeNumberPoints = Math.round(pointsDb).toLocaleString();
  const PlayerAddress = address ? `...${address.substring(address.length - 5)}` : '';

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div>
        <ConnectedAddress />
      </div>

      <div >
        <p className="my-6 text-xl"> Checkout Summary </p>
      </div>
      <div className="border rounded-[5px] pb-10 p-2 bg-blue bg-opacity-20">
        <p className="flex gap-2 py-2 items-center"> <FaInfo color="blue" /> You have {products.length} products for checkout, Please note you will have
          to sign individual transaction for each products to complete purchase.</p>
        <p className="flex gap-2 items-center"> <FaBiohazard color="red" />  Please see info here for more details </p>

        <hr className="my-5" />

        <p className="flex gap-2 items-center"> <FaWallet color="blue" /> Total checkout Amount {/*expected to pay on  is for products */}: ${totalAmted.toLocaleString()} </p>
        <p className="flex gap-2 my-2 items-center"> <FaShippingFast color="blue" /> Shipping  fees:  ${checkOut.toLocaleString()} </p>

        <p className="py-1 flex gap-2 items-center"><FaCoins color="green" /> Token equivalent {toPaysToken} {"(Token Symbol)"}</p>

        <br></br>
        <div className="border px-2 py-1  bg-ash bg-opacity-40 rounded">
          <div className="border w-fit rounded-[2px] p-2">
            <p className="flex gap-1 items-center"> <FaGamepad size={20} color="blue" /> Play Points accumulated for <span className="text-blue"> {PlayerAddress}</span> </p>
            <p className="flex gap-2 items-center">Your Points: <p className="text-blue"> {`${wholeNumberPoints}`} </p> PP</p>
          </div>
          <p className="py-2"> <span className="font-bold">NB:  </span> 10,000,000 PP  = $50 </p>

          <div className="flex-col">
            <FormControl>
              <RadioGroup>
                <label className="flex items-center gap-2">
                  <p className="flex my-1 text-sm border w-fit p-2 rounded-[2px] items-center gap-2">
                    <Radio size="small" value="fullPayment" />    Apply payment with available points </p>

                </label>
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div>
          <p className="py-2">Balance after point offset: ${[totalAmted.toLocaleString() - 200]}</p>
        </div>

        <button onClick={handleTestCheckout} className="w-52 h-10 bg-blue text-white text-lg mt-4 hover:bg-black border rounded duration-300">
          Pay Now
        </button>

        <PaymentDraweable/>
      </div>
    </div>
  );
};

export default Payment;
