import { FaWallet, FaCopy, FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { GoAlert } from "react-icons/go";
import ConnectSwitch from "./WalletSwitch";

function ConnectedAddress() {
    const { address, isConnected } = useAccount();

    // console.log(address)
    return (
        <div>

            <div className="flex">

                {!address ? (
                    <div className="bg-reddy border rounded-[5px] bg-opacity-20  p-2">
                        <p className="flex gap-1 items-center"> <GoAlert size={20} /> Wallet not connected <Link to={"/signIn"}><span className="text-blue">Sign In</span> </Link></p>

                    </div>

                ) : (
                    <div className="bg-black border rounded-[5px]  p-2">
                        <p className=" flex gap-2 text-white  items-center  ">  <FaWallet size={20} color="white" />  Wallet Connected</p>


                    </div>

                )}

            </div>

            <div className=" bg-ash border rounded-[5px] bg-opacity-20  p-2">
            <ConnectSwitch />

            </div>

        </div>

    )
}
export default ConnectedAddress;