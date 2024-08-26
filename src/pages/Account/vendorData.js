import Banner from "../../components/Banner/Banner";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VendorData = () => {

  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [category1, setCategory1] = useState(false);
  const [banner, setBanner] = useState(false);

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
          <p> Click to view </p>

          <div className="mt-4 py-4">
            <Banner />

          </div>
        </div>
      </div>

      <div className="w-full bg-black bg-opacity-80 mx-auto border px-4 py-6 mr-2 ">
        <div className="p-4 border rounnded-20">
       <p>Add NEw Product </p>

        <Link Link to="/addProducts">
          <button className="w-90% border rounded-[10px] py-2  bg-blue hover:bg-black  duration-300 text-white text-lg font-titleFont b-20 my-5">
            <span className="mr-5  bg-blue hover:bg-black "></span> Add product <span className="mr-5"></span>
          </button>
        </Link>

        </div>
      </div>

      <br></br>

      <div className="w-full bg-ash mx-auto border px-4 py-6 mr-2 ">
        <h4>You have a of {200} Total Products Listed  - <span className="text-italics hover:pointer-cusor">click to view</span></h4>

        <span className="w-full">
          <div className="w-full bg-ash my-2 border px-4 py-6 mr-2 ">
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
        <h4>Total Products Listed {200} - <span className="text-italics hover:pointer-cusor">click to view</span></h4>

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
