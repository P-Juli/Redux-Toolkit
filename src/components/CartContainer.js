import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
// import cartItems from "../cartItems";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal, openModal } from "../features/Modal/modalSlice";




const CartContainer = () => {
  const { amount, total, cartItems } = useSelector((state) => state.cart);
  const dispatch =useDispatch();
const {isOpen} = useSelector((state)=>state.modal)
  
  
  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your cart</h2>
          <h4 className="empty-cart">is empty </h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item)=>{
            return(
              <CartItem key={item.id} {...item}/>  
            )
        })}
      </div>
      <footer>
        <h4> your total is NRs {total.toFixed(2)}/-</h4>
        <button className="btn clear-btn" onClick={()=>dispatch(openModal())}>Clear Cart</button>
      </footer>
      
    </section>
  );
};

export default CartContainer;
