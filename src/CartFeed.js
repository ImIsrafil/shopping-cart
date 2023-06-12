import React from "react";
import CartItem from "./CartItem";

const CartFeed = ({
  cart,
  products,
  handleRemoveFromCart,
  handleUpdateProductQuantity,
}) => {
  return (
    <div className="cartFeed">
      {cart.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          products={products}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateProductQuantity={handleUpdateProductQuantity}
        />
      ))}
    </div>
  );
};

export default CartFeed;
