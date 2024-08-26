import React, { useEffect } from "react";
import "./Cart.css";
import Button from "../buttons/Button";
import { useAccount } from "wagmi";
import { Bounce, toast, ToastContainer } from 'react-toastify'; // Optional: For toast notifications
import 'react-toastify/dist/ReactToastify.css';

function Cart({ cartItems, onCheckout, isCheckoutAttempted }) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const { address, isConnected } = useAccount();

  //Add a command to show toast if Start button  is clicked with no product added to cart
  useEffect(() => {
    if (cartItems.length === 0) {
    //  toast.warning('Choose 4 product first!');
      console.log('Nothing to see')
    }

  }, [])

  return (
    <div className="cart__container">
      <div></div>
      {cartItems.length === 0 ? "No items in cart yet" : ""}
      <br />
      <br></br>
      <span className="">Total Price: ${totalPrice.toFixed(2)}</span>
      <Button
        title={`${cartItems.length === 0 ? "Start !" : "Checkout"} `}
        type={"checkout"}
        disable={cartItems.length === 0 || isCheckoutAttempted}
        onClick={onCheckout}
      />
    </div>
  );
}

export default Cart;