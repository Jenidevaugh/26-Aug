import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import UserData from "./pages/Account/userdata";
import AppProduct from "./pages/Account/addProd";
import VendorData from "./pages/Account/vendorData";
import ErrorPage from "./pages/Errors/ErrorPage";
import PlayApp from "./Play/play";
import Tasks from "./Play/Componentss/Tasks";
import Leaderboard from "./Play/Componentss/Leaderboard";
import GetProducts from "./pages/Shop/GetProd";
import ProductDetails1 from "./pages/ProductDetails/productDeets";
import Products from "./pages/Account/Products";
  


const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />

      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement = {<ErrorPage/>} >
      <Route path="/" element={<Layout />} >
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
       {/* <Route path="/shop" element={<Shop />}></Route>*/}
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />} ></Route>
        <Route path="/journal" element={<GetProducts />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product-details/:id" element={<ProductDetails1 />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/play" element={<PlayApp />}></Route>
      <Route path="/Tasks" element={<Tasks />}></Route>
      <Route path="/Leaderboard" element={<Leaderboard />}></Route>
       <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/userData" element={<UserData />}></Route>
      <Route path="/vendorData" element={<VendorData />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/addProducts" element={<AppProduct />}></Route>

    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
