import { Helmet } from "react-helmet";
import "../design.css";
import { getData } from "../db/db.js";
import Header from "../../components/home/Header/Header.js";
import { FaCopy, FaFaucet, FaGamepad, FaInfo, FaPlay, FaShoppingCart } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from 'react-toastify'; // Optional: For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import SimpleBottomNavigation from "./Navigate.js";

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



//const supabase = createClient('https://fofimcnyyiryquyxyaki.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZmltY255eWlyeXF1eXh5YWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1Mzk1MDYsImV4cCI6MjAzNzExNTUwNn0.qlbPfPFLsffOhdrCL-9U-OsppItlOefrcaaR2QTCJFo');




function Tasks() {
  // const [isRecent, setIsRecent] = useState(false); // State to check if entry is recent



  return (
    <>
      <div className="min-h-screen flex flex-col">

        <Helmet>
          <meta charSet="utf-8" />
          <title>Play App</title>
          <meta name="description" content="Play and win points with our game!" />
        </Helmet>

        <Header />
        <br></br>
        <div className="justify-center xs:flex-col flex lg:gap-11 sm:gap-2 lg:flex-row sm:flex-col w-100 border rounded flex-row bg-deepb bg-opacity-80 200 text-white py-2">

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
        <h1 className="py-2 heading">Tasks Section</h1>
        <br></br>
        <div className="items-center mx-1 rounded rounded-lg">


        </div>
      </div>

      <div className="flex w-full h-fit bg-white sticky bottom-0 z-50 w-full justify-center">
        <SimpleBottomNavigation />

      </div>
    </>
  );
}

export default Tasks;