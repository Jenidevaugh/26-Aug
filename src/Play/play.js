import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import "./design.css";
import Card from "./card/Card.jsx";
import Cart from "./cart/Cart.jsx";
import { getData } from "./db/db";
import Header from "../components/home/Header/Header.js";
import ConnectAddress from "./connectAddress.js";
import { FaCopy, FaFaucet, FaGamepad, FaInfo, FaPlay, FaShoppingCart } from "react-icons/fa";
import { useAccount } from "wagmi";
import { Slider } from "@mui/material";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import supabase from "./supaase.js";
import { Bounce, toast, ToastContainer } from 'react-toastify'; // Optional: For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import SimpleBottomNavigation from "./Componentss/Navigate";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//const firebaseConfig = {
//  apiKey: "AIzaSyCgY8EXkuwZD4uuFISqVxeSV-J8fJcff_M",
//  authDomain: "syslink-b7300.firebaseapp.com",
//  databaseURL: "https://syslink-b7300-default-rtdb.firebaseio.com",
//  projectId: "syslink-b7300",
//  storageBucket: "syslink-b7300.appspot.com",
//  messagingSenderId: "546139820635",
//  appId: "1:546139820635:web:e927e2e8a049554fc1657e",
//  measurementId: "G-DQ9PCX852N"
//};
//
//// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//

import { createClient } from "@supabase/supabase-js";


const foods = getData();

//const supabase = createClient('https://fofimcnyyiryquyxyaki.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZmltY255eWlyeXF1eXh5YWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1Mzk1MDYsImV4cCI6MjAzNzExNTUwNn0.qlbPfPFLsffOhdrCL-9U-OsppItlOefrcaaR2QTCJFo');




function PlayApp() {
  const foods = getData();
  // const [isRecent, setIsRecent] = useState(false); // State to check if entry is recent

  const [cartItems, setCartItems] = useState([]);
  const [error1, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [result, setResult] = useState('');
  const [slideAMA, setSlideAMA] = useState('');
  const [points1, setPoints1] = useState('');
  const [pointsDb, setPointsDb] = useState('');

  const [resultSlide, setResultSlide] = useState('');
  const [isCheckoutAttempted, setIsCheckoutAttempted] = useState(false);
  const { address, isConnected } = useAccount();

  const [gameResults, setGameResults] = useState([]);
  const { sendTransaction } = useSendTransaction()
  const [countries, setCountries] = useState([]);
  const newTotal = resultSlide + points1;

  const date = Date.now();


  async function GetCountries() {

    try {
      let { data: Gameplay, } = await supabase
        .from('Gameplay')
        .select();

      setCountries(Gameplay);

    } catch (error) {
    }
  };
  async function AddUser() {

    const { data: LoggedIn, error } = await supabase.auth.signInAnonymously()

    try {
      const { data: AddData, error: insertError } = await supabase
        .from('Gameplay')
        .insert({ address: address, points: points1 });

    } catch (error) {
    }
  };

  //async function GetTime() {
  //  try {
  //    let { data: Gameplay, error } = await supabase
  //      .from('Gameplay')
  //      .select('created_at')
  //      .eq('address', address)
  //      .single(); // Assuming there is only one entry per address
  //
  //    if (error) {
  //      throw error;
  //    }
  //
  //    if (Gameplay) {
  //      const { created_at } = Gameplay;
  //      const currentTime = new Date();
  //      const entryTime = new Date(created_at);
  //
  //      // Calculate time difference in hours
  //      const timeDifferenceInHours = (currentTime - entryTime) / (1000 * 60 * 60);
  //
  //      if (timeDifferenceInHours <= 24) {
  //        setIsRecent(true);
  //      } else {
  //        setIsRecent(false);
  //      }
  //    } else {
  //      setIsRecent(false); // No entry found
  //    }
  //
  //    console.log(Gameplay);
  //
  //  } catch (error) {
  //    console.error('Error fetching time:', error);
  //  }
  //}

  //add points at first for first address
  //async function AddUser() {

  //  try {

  //    const { data: AddData } = await supabase
  //      .from('Gameplay')
  //      .insert({ address: address, points: points1 })

  //    console.log(AddData)

  //  } catch (error) {

  //  }
  //}

  //Update User details

  //Toast Notifications
  const notify = () => {
    toast("Points Saved!");

    toast.success("Success Notification !", {
      position: "bottom-center"
    });

    toast.error("Something went wrong!", {
      position: "bottom-center"
    });

    toast.warn("Warning Notification !", {
      position: "bottom-center"
    });

    toast.info("Info Notification !", {
      position: "bottom-center"
    });

    toast("Custom Style Notification with css class!", {
      position: "bottom-center",
      className: 'foo-bar'
    });
  };

  async function UpdateUser() {

    const { data: LoggedIn, error } = await supabase.auth.signInAnonymously()

    try {

      console.log(LoggedIn)

      // First, check if the entry with the given address exists
      let { data: existingEntry, error: fetchError } = await supabase
        .from('Gameplay')
        .select('address')
        .eq('address', address);

      console.log(existingEntry);

      if (fetchError) {
        // throw fetchError;
      }

      if (existingEntry) {
        // If the entry exists, update the points
        const upPoints = points1 + pointsDb;

        console.log(upPoints);

        const { data: updatedPoints, error } = await supabase
          .from('Gameplay')
          .update({ points: upPoints })
          .match({ address: address });

        if (error) {
          throw error;
        }

        console.log('Updated Points:', updatedPoints);

        //Call Success toast
        toast.success('Points updated successfully!');

      } else {
        const { data: AddData, error: insertError } = await supabase
          .from('Gameplay')
          .insert({ address: address, points: points1 });

        console.log('New Entry:', AddData);

        if (insertError) {
          throw insertError;
        }

      }
    } catch (error) {
      toast.error('Error Occurred')

      console.error(error);
    }
  };

  // async function AddDAta() {
  //
  //   try {
  //     const { data: AddData, error: insertError } = await supabase
  //     .from('Gameplay')
  //     .insert({ address: address, points: points1 });
  //
  //
  //     if (insertError) {
  //       throw insertError;
  //     }
  //
  //   }
  //   catch (insertError){
  //     console.log('test')
  //   }
  // }
  //


  async function AddDAta() {
    try {
      // Check if the address already exists
      const { data: existingData, error: selectError } = await supabase
        .from('Gameplay')
        .select('points')
        .eq('address', address)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        // If there's an error other than "no rows returned", throw it
        throw selectError;
      }

      if (existingData) {

        const newData = resultSlide + points1
        // Address exists, update the points
        const { error: updateError } = await supabase
          .from('Gameplay')
          .update({ points: existingData.points + newData })
          .eq('address', address);

        if (updateError) {
          throw updateError;
        }
      } else {

        const newData = resultSlide + points1

        // Address does not exist, insert a new row
        const { error: insertError } = await supabase
          .from('Gameplay')
          .insert({ address: address, points: newData });

        if (insertError) {
          throw insertError;
        }
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  async function GetUserPoints() {

    const { data: LoggedIn, error } = await supabase.auth.signInAnonymously()

    try {

      let { data: Gameplay, error } = await supabase
        .from('Gameplay')
        .select('points')
        .eq('address', address);

      if (error) {
        // throw error;
      }

      if (Gameplay.length > 0) {
        setPointsDb(Gameplay[0].points);
      } else {
        // console.log('no points in DB fro Address')
        setPointsDb(0); // Set to 0 if no data found
      }

      console.log(Gameplay);
    } catch (error) {
      //  console.error(error);
    }
  };



  const wholeNumberPoints = Math.round(pointsDb).toLocaleString();
  const PlayerAddress = address ? `...${address.substring(address.length - 5)}` : '';


  // console.log(points1, resultSlide)

  useEffect(() => {
    GetCountries();
    // GetTime();

    const assume = points1 * slideAMA;
    setResultSlide(assume);

    if (isConnected) {
      const interval = setInterval(GetUserPoints, 2000);

      return () => clearInterval(interval);
    }
  }, [isConnected, points1, slideAMA, pointsDb]);


  const onAdd = (food) => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (totalItems >= 4) {

      toast.error('Add Only 4 Products!');

      setWarning('You can only add up to 4 products.');
      return;
    }

    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }

    if (totalItems + 1 <= 4) {
      setWarning('');
    }
    setError('');
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    if (cartItems.length < 4) {
      setError('You need to add at least 4 products to checkout.');
      return;
    }

    //add a toast to block showing the wining card if 
    //the product added to cart is over 4

    const points = checkForWinningCard(cartItems);
    setPoints1(points);
    if (points > 0) {
      setResult(`Congratulations! You have won ${points.toLocaleString()} points!`);
    } else {
      setResult('Sorry, no winning card this time. Try again!');
    }
    setError('');
    setIsCheckoutAttempted(true);
  };

  const checkForWinningCard = (items) => {
    const totalPoints = 10000;
    const probabilities = items.map(item => item.probability || 0);
    const totalProbability = probabilities.reduce((sum, prob) => sum + prob, 0);
    const randomNum = Math.random() * totalProbability;
    let cumulativeProbability = 0;

    for (let i = 0; i < items.length; i++) {
      cumulativeProbability += probabilities[i];
      if (randomNum <= cumulativeProbability) {
        return (probabilities[i] / totalProbability) * totalPoints;
      }
    }
    return 0;
  };



  const handleCheckout = async () => {
    try {
      const send = await sendTransaction({
        to: '0x69d8a5e104fbf6ccb8f4f71b32a8810526d2f25c',
        value: parseEther(`${slideAMA}`),
      });

      console.log('This is hash? ');
      if (!send) {
        AddDAta();
      }
    } catch (error) {
      console.error('Transaction or Firestore operation failed:', error);
    }
  };

  //useEffect(() => {
  //  handleCheckout();
  //}, [resultSlide, address, date]);
  //

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address)
        .then(() => {
          console.log('Address copied to clipboard');
          //   toast.success('Address copied to clipboard!'); // Optional: Show a success message
        })
        .catch((err) => {
          console.error('Failed to copy address: ', err);
          //  toast.error('Failed to copy address.'); // Optional: Show an error message
        });
    } else {
      console.log('Address is not defined');
    }
  };

  return (
    <>
      <div className="bodys">

        <Helmet>
          <meta charSet="utf-8" />
          <title>Play App</title>
          <meta name="description" content="Play and win points with our game!" />
        </Helmet>

        <Header />
        <br></br>
        <div className="justify-center xs:flex-col flex lg:gap-11 sm:gap-2 lg:flex-row sm:flex-col w-100 border rounded flex-row bg-deepb bg-opacity-80 200 text-white py-2">
          <ConnectAddress />
          <p className="flex gap-2 items-center border mx-2 py-2 px-2 rounded-[8px]">
            Address: {PlayerAddress} <FaCopy className="copy-icon" onClick={copyToClipboard} />
          </p>
          <p className="border mx-2 flex items-centerpy-2 px-2 py-2 rounded-[8px]"> {address ? wholeNumberPoints : '0'}  PP</p>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
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
        <h1 className="py-2 heading">Play to accumulate points, redeem in-store in real-time.</h1>
        <br></br>
        <div className="items-center mx-1 rounded rounded-lg">
          <span >
            {result && (

              <p className="px-4 bg-deepb bg-opacity-80 text-white justify-center py-2">
                {result}
                <div>
                  <p>Boost Points </p>
                  <Slider
                    aria-label="Boost"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    getAriaValueText={setSlideAMA}
                    shiftStep={1}
                    step={1}
                    marks
                    min={0}
                    max={10}
                  />
                </div>
                <span> Boost token {slideAMA} SYS <br></br></span>

                <p>Your Boosted points {newTotal.toLocaleString()}</p>

                <button className="px-2 py-2 rounded-lg bg-black hover:bg-blue duration-500" onClick={AddDAta}
                  disabled={!isConnected || !address}>
                  Save
                </button>
              </p>
            )}

          </span>
        </div>
        <Cart cartItems={cartItems} onCheckout={onCheckout} isCheckoutAttempted={isCheckoutAttempted} />
        <div className="cards__container">
          {foods.map((food) => (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          ))}
        </div>
        <br></br>
        <br></br>


        <br></br>
        <div className="flex flex-row lg:flex-row sm:flex-col xs:flex-col md:space-y-0 md:space-x-2 mr-2">
          <div className="howTo md:w-1/2">
            <p className="flex my-2 gap-2 items-center">How to play <FaPlay /> </p>
            <div className="text-black">
              <p className="flex item-center gap-1">No. 1: Get gas for saving your points from faucet <FaInfo display={'showHow'} /> </p>
              <p>No. 2: Pick 4 Cards and checkout to view probable outcome for each gameplay</p>
              <p>No. 3: Sign transaction to store points for future redemption.</p>
              <p className="py-2">
                <span className="font-bold">NB: </span> You need to save every point earned by signing after every 24hrs session
              </p>
            </div>
          </div>
          <div className="howTo md:w-1/2">
            <p className="flex my-2 gap-2 items-center">How to Redeem points <FaShoppingCart /> </p>
            <div className="text-black">
              <p className="flex item-center gap-1">No. 1: Complete one session gameplay per day (24 hrs). <FaInfo display={'showHow'} /> </p>
              <p>No. 2: Sign transaction to Log your points</p>
              <p>No. 3: Proceed to redemption once your points are up to checkout amount</p>
              <p className="py-2">
                <span className="font-bold">NB: </span> Gameplay is totally free but not for boosts.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:flex-row sm:flex-col xs:flex-col md:space-y-0 md:space-x-2 mr-2">
          <div className="howTo md:w-1/2">
            <p className="flex my-2 gap-2 items-center">About SYSLink --- Game and PP <FaGamepad size={20} /> </p>
            <div className="text-black">
              <p className="flex item-center gap-1">No. 1: Get gas for saving your points from faucet <FaInfo display={'showHow'} /> </p>
              <p>No. 2: </p>
              <p>No. 3:  </p>
              <p className="py-2">
                <span className="font-bold">NB: </span> You need to save every point earned by signing after every 24hrs session
              </p>
            </div>
          </div>
          <div className="howTo md:w-1/2">
            <p className="flex my-2 gap-2 items-center"> Useful Links <FaShoppingCart size={20} /> </p>
            <div className="text-black">
              <p className="flex item-center gap-1">Faucet: <FaFaucet color="blued" size={20} /> </p>
              <p>No. 2: </p>
              <p>No. 3:</p>
              <p className="py-2">
                <span className="font-bold">NB: </span> Gameplay is totally free but not for boosts.
              </p>
            </div>
          </div>
        </div>

       
      </div>

      <div className="flex w-full h-fit bg-white sticky bottom-0 z-50 w-full justify-center">
          <SimpleBottomNavigation />

        </div>
    </>
  );
}

export default PlayApp;