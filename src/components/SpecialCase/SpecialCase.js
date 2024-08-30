import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";


const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);

  const { address, isConnected } = useAccount();

  useEffect(() =>{
 
  }, [])
  
 // console.log(address);

  return (
    <div className="fixed top-52 right-2 z-20  flex-col gap-2">
      {/* {!isConnected ? (<Link to="/userData">
        <div className="bg-ash w-16 h-[70px] rounded-md flex flex-col gap-1 text-white justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-500" />

            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-500" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Profile</p>
        </div>
      </Link>) : (*/ } 
       <Link to="/signin">
          <div className="bg-ash w-16 h-[70px] rounded-md flex flex-col gap-1 text-white justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
            <div className="flex justify-center items-center">
              <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-500" />

              <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-500" />
            </div>
            <p className="text-xs font-semibold font-titleFont">Profile</p>
          </div>
        </Link>
     {/* )}*/}
      <br></br>
      <Link to="/cart">
        <div className="bg-ash w-16 h-[70px] rounded-md flex flex-col gap-1 text-white justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-500" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-500" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Buy Now</p>
          {products.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {products.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
