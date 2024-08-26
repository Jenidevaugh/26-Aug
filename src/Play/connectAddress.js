import { FaWallet, FaCopy, FaPenFancy } from "react-icons/fa";
 import { useAccount } from "wagmi";
import { GoAlert } from "react-icons/go";
import { useDisconnect, useConnect,  } from "wagmi";
import { WalletButton } from "@rainbow-me/rainbowkit";

function ConnectAddress() {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect();
  
   // console.log(address)

    return (
        <div className="flex px-2">

            {!address ? (
                <div className="bg-red border rounded-[5px] bg-opacity-20  p-2">
                    <span className="flex gap-1 items-center"> <GoAlert size={20}/> Wallet disconnected 
                      {!address ? (
                    <div>
                        <WalletButton.Custom wallet='Metamask'>
                            {({ ready, connect }) => (
                                <button
                                className="bg-ash text-white p-1 rounded-[8px]"                                     type="button"
                                    disabled={!ready}
                                    onClick={connect}>
                                    Connect Wallet
                                </button>
                            )}
                        </WalletButton.Custom>
                    </div>
                ) : (
                    <button onClick={disconnect} type="button">
                        Disconnect Wallet
                    </button>
                )}</span>

                </div>

            ) : (
                <div className="bg-black border rounded-[5px]  p-2">
                    <span className=" flex gap-2 text-white  items-center  ">  <FaWallet size={20} color="white"/>  Wallet Connected <button className="bg-ash p-1 rounded-[8px]" onClick={disconnect}> Disconnect</button></span>

 
                </div>

            )}
        </div>


    )
}
export default ConnectAddress;