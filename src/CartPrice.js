import React from "react";
import CartItemPrice from "./CartItemPrice";

const CartPrice = ({ cart }) => {
  const total = cart.reduce(
    (total, item) => item.price * (item.quantity ? item.quantity : 1) + total,
    0
  );
  const totalFixed = total.toFixed(2);
  return (
    <div className="cartPrice">
      {cart.length ? (
        cart.map((item) => <CartItemPrice key={item.id} item={item} />)
      ) : (
        <p>$000</p>
      )}
      <div className="total-price">
        <p>Total price:</p>
        <p>${totalFixed}</p>
      </div>
    </div>
  );
};

export default CartPrice;
