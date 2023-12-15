import React from "react";
import { CartIcon } from "../icons";
// import {} from '../features/cart/cartSlice'
import { useSelector, useDispatch }  from 'react-redux'

const Navbar = () => {
    const amount = useSelector((state)=>state.cart.amount)// state is the entire store.
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
            <CartIcon/>
            <div className="amount-container">
            <p className="total-amount">{amount}</p>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
