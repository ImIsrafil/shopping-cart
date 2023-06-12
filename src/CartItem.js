import React from "react";
import { BsCartX } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import api from "./api/products";

const CartItem = ({
  products,
  product,
  handleRemoveFromCart,
  handleUpdateProductQuantity,
}) => {
  const isStock = products.find(
    (item) => item.id === product.id && item.title.includes(product.title)
  );
  return (
    <div className="cartItem">
      <img src={product.image} alt={product.title} />
      <div className="cart-content">
        <p className="cart-title">{product.title}</p>
        <p className="cart-price">${product.price}</p>
        <p>{isStock ? "In Stock" : "Stock Out"}</p>
        <button
          className="btn cart remove"
          onClick={() => handleRemoveFromCart(product)}
        >
          Remove <BsCartX />
        </button>

        <button
          disabled={product.quantity ? product.quantity <= 1 : false}
          onClick={() => handleUpdateProductQuantity(product, false)}
        >
          <AiOutlineMinus />
        </button>
        {product.quantity ? product.quantity : 1}
        <button onClick={() => handleUpdateProductQuantity(product, true)}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
