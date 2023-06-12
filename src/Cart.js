import React from "react";
import CartFeed from "./CartFeed";
import CartPrice from "./CartPrice";

const Cart = ({
  cart,
  products,
  handleRemoveFromCart,
  handleUpdateProductQuantity,
}) => {
  return (
    <section className="cart container">
      {cart.length ? (
        <CartFeed
          cart={cart}
          products={products}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateProductQuantity={handleUpdateProductQuantity}
        />
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
