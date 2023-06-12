import React from "react";

const CartItemPrice = ({ item }) => {
  return (
    <div className="cartItemPrice">
      <img src={item.image} alt={item.title} />
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity || 1}</p>
    </div>
  );
};

export default CartItemPrice;
