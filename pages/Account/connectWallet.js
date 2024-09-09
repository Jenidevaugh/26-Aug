import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import { setWalletAddress } from '../../redux/orebiSlice';
import { WalletButton } from '@rainbow-me/rainbowkit';
import {
  useConnectModal,
  useAccountModal,
  useChainModal
} from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';
import { useDisconnect, useConnect } from 'wagmi';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight, } from 'react-icons/fa';
import { useSignMessage } from 'wagmi';



const ConnectWallet = ({ children }) => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate(); // initialize useNavigate
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const { signMessage } = useSignMessage();

  const handleSignMessage = async () => {
    try {
      const message = "Please sign this message to verify your identity.";
      const signature = await signMessage({ message });
      console.log("Message signed:", signature);
      // Handle the signed message (e.g., send it to your backend for verification)
    } catch (error) {
      console.error("Message signing failed:", error);
    }
  };

  return (
    <div className="flex w-full mx-auto my-5 border px-4 py-6 mr-2">
      <div className='mx-2 my-2 text-white w-fit p-2 h-50 bg-blue rounded-lg'>
        {!address ? (
          <button onClick={connect} type="button">
            Connect Wall
          </button>
        ) : (
          <button onClick={disconnect} type="button">
            Disconnect Wallet
          </button>
        )}
      </div>
      <div>
        <div className="w-1/2 rounded-lg py-2 px-2 bg-black">
          {address && isConnected && (
            <>
              <Link to="/userData">
                <p className="text-base text-gray-500 mt-2">
                  Wallet connected: {address.slice(0, 5)} <br />
                  <span className="flex">
                    <FaArrowAltCircleRight /> Go to profile
                  </span>
                </p>
              </Link>
              <button onClick={handleSignMessage} type="button" className="mt-4 bg-blue text-white p-2 rounded">
                Sign Message
              </button>
            </>
          )}
          {!address && (
            <p>NUll</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;