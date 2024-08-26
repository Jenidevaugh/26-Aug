import { motion } from "framer-motion"
import { emptyCart } from "../../assets/images";
import { Link } from "react-router-dom";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import { useAccount } from "wagmi";

const ErrorPage = () => {
    const { addres, isconnected } = useAccount();

    return (
        <div>
            <Header />
            <HeaderBottom />
            <br></br>
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
            >
                <div>
                    <img
                        className="w-80 rounded-lg p-4 mx-auto"
                        src={emptyCart}
                        alt="emptyCart"
                    />
                </div>
                <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                    <h1 className="font-titleFont text-xl font-bold uppercase">
                        There seems to be an error.
                    </h1>
                    <p className="text-sm text-center px-10 -mt-2">
                        Your link might have been broken, or you should not be here.
                    </p>

                     

                    <Link to="/">
                    <button className="bg-blue rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                            Go back Home
                        </button>
                    </Link>
                </div>
            </motion.div>
            <Footer />
            <FooterBottom />
        </div>
    )
};
export default ErrorPage;