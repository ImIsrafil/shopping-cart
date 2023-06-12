import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import CartFeed from "./CartFeed";
import CartPrice from "./CartPrice";

const Cart = () => {
  const { cart } = useContext(AppContext);
  return (
    <section className="cart container">
      {cart.length ? (
        <CartFeed cart={cart} />
      ) : (
        <p style={{ color: "green", textAlign: "center" }}>
          !Your Cart is Empty
        </p>
      )}

      <CartPrice cart={cart} />
    </section>
  );
};

export default Cart;
