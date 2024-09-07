import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileLog from "./ProfileLog";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { useDisconnect, useConnect } from 'wagmi';
import { WalletButton } from '@rainbow-me/rainbowkit';
import { Bounce, toast, ToastContainer } from 'react-toastify'; // Optional: For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight, FaShoppingBag } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';




function Draweable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [open, setOpen] = useState(false);
  const [wasConnected, setWasConnected] = useState(false);

  useEffect(() => {
    if (isConnected && !wasConnected) {
      toast.success('Wallet Connected');
      setWasConnected(true);
    } else if (isDisconnected && wasConnected) {
      toast.warn('Wallet Disconnected');
      setWasConnected(false);
    }
  }, [isConnected, isDisconnected, wasConnected]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (

    <div className='mx-2  my-2 text-white w-fit p-2 h-50 bg-blue rounded-lg'>
      <button onClick={toggleDrawer}>{isConnected ? 'Connected' : 'Connect'}</button>



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
          <div className='mx-2 my-2 text-white w-fit p-2 h-50 bg-blue rounded-lg'>
            {!address ? (
              <div>
                <WalletButton.Custom wallet='metamask'>
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
        )}

        <br></br>

        <div>
          <div className="w-8/9  mx-2 rounded-lg py-2 px-1 bg-black">
            {address && (
              <Link to="/userData">
                <p className="text-base text-gray-400 mt-2">
                  Wallet connected: {address.slice(0, 5)}...{address.slice(38, 55)} <br></br>
                  <span className="flex items-center gap-2">
                    <FaArrowAltCircleRight /> Go to profile
                  </span>
                </p>
              </Link>
            )}
          </div>
        </div>


        <div>
          <div className="w-8/9  my-9 mx-2 rounded-lg py-2 px-1 bg-black">
            {address && (
              <Link to="/cart">
                <p className="text-base text-gray-400 mt-2">

                  <span className="flex items-center gap-2">
                    <FaShoppingBag /> Go back to Cart
                  </span>
                </p>
              </Link>
            )}
          </div>
        </div>

        <div>
          <p className="mx-2 my-5">{isConnected ? 'You are now connected, Please click on the tab above to go to your Account'
            : 'Please connect to get started '}</p>
        </div>

        <div>
          <p className="mx-2 my-5">{isConnected ? 'Play the SYSLink Game here, redeem points in realtime'
            : ''}</p>
        </div>
      </Drawer>
    </div>
  );
}

export default Draweable;