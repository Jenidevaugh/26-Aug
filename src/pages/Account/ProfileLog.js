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
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useDisconnect, useConnect } from 'wagmi';
import { Backdrop, Dialog, Drawer } from '@mui/material';
import { DialogTitle } from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import Draweable from './Draweable';
//(
//    <div>
//        {openAccountModal && (
//            <button onClick={openAccountModal} type="button">
//                Open Account Modal
//            </button>
//        )} <br />
//        {openChainModal && (
//            <button onClick={openChainModal} type="button">
//                Open Chain Modal
//            </button>
//        )}
//        <br />
//
//    </div>
//)
 
const ProfileLog = () => {
    const { address, isConnected, } = useAccount();
    const navigate = useNavigate(); // initialize useNavigate

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect();



    return (
        <div className="w-full mx-fit my-5 border px-2 py-6 mr-2">
                    

            <div className='mx-2  my-2 text-white w-fit p-2 h-50 bg-blue rounded-lg'>
                {!address ? (
                    <div>

                        <WalletButton.Custom wallet='metamask' >
                            {({ ready, connect }) => (
                                <button 
                                    type="button"
                                    disabled={!ready}
                                    onClick={connect}>
                                    Connect Meta
                                </button>
                            )}
                        </WalletButton.Custom>
                    
                    </div>
                ) : (
                    <button onClick={disconnect} type="button">
                        Disconnect Wallet
                    </button>
                )}

            </div>
                                 


            <div>
                <div className="w-6/6 items-center rounded-lg py-2 px-1 bg-black">

                    {address && (
                        <Link to="/userData">   <p className="text-base text-gray-400 mt-2">
                            Wallet connected: {address.slice(0, 5)}...{address.slice(38, 55)} <br></br> 
                            <span className="flex items-center gap-2">
                                 <FaArrowAltCircleRight /> Go to profile</span>
                        </p> </Link>
                    )}
                </div>
                
            </div>
        </div>
    )
}

export default ProfileLog;