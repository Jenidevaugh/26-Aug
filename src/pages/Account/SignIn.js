import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useAccount } from "wagmi";
import { FaArrowAltCircleRight, FaInfo } from "react-icons/fa";
import ProfileLog from "./ProfileLog";
import Draweable from "./Draweable";
import { GetProducts } from "../Shop/GetProd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {

  const { address, isConnected } = useAccount();
  const navigate = useNavigate();



  // console.log(address)

  return (
    <div className="w-full h-screen flex items-center ">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with Decentralized Shopping
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all SYSLink services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © SYSLink
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lgl:w-[500px]   ">
        <div className="px-3 lgl:px-[0] w-full h-[40%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
            Connect Wallet to Sign in
          </h1>
          <div>

            {/*<ProfileLog/>*/}

            <div className="w-full mx-fit my-5 border px-2 py-6 mr-2">

              <Draweable />
              <div>
                <p className="mx-2 flex gap-1 items-center my-5"><FaInfo color="blue" /> {isConnected ? 'Click Button to Disconnect or Go to Profile'
                  : 'Please connect to get started '}</p>
              </div>
            </div>
          </div>

          <p className="text-sm mx-3 text-primeColor">
            Don't have an account yet? <Link to="/signup"><span className="text-blue">Sign up{" "}</span></Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default SignIn;
