import React from "react";
import CartItem from "./CartItem";

const CartFeed = ({ cart }) => {
  return (
    <div className="cartFeed">
      {cart.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CartFeed;
