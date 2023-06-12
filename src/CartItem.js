import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import { BsCartX } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import api from "./api/products";

const CartItem = ({ product }) => {
  const { products, handleRemoveFromCart, cart, setCart } =
    useContext(AppContext);
  const isStock = products.find(
    (item) => item.id === product.id && item.title.includes(product.title)
  );

  const handleUpdateProductQuantity = async ({ product, isIncrease }) => {
    const hasProduct = cart.find(
      (item) => item.id === product.id && item.title.includes(product.title)
    );
    if (hasProduct) {
      let quantity = 1;
      if (isIncrease) {
        quantity = hasProduct.quantity ? hasProduct.quantity + 1 : 1 + 1;
      } else {
        if (hasProduct.quantity) {
          if (hasProduct.quantity > 1) {
            quantity = hasProduct.quantity - 1;
          } else if (hasProduct.quantity === 1) {
            quantity = hasProduct.quantity;
          }
        } else {
          quantity = 1;
        }
      }
      const updateProp = { quantity };
      try {
        const response = await api.patch(`/cart/${product.id}`, updateProp);
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: response.data.quantity }
              : item
          )
        );
      } catch (err) {
        if (err.response) {
          console.log(err.response.message);
          console.log(err.response.status);
        } else {
          console.log(err.message);
        }
      }
    }
  };
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
          onClick={() =>
            handleUpdateProductQuantity({ product, isIncrease: false })
          }
        >
          <AiOutlineMinus />
        </button>
        {product.quantity ? product.quantity : 1}
        <button
          onClick={() =>
            handleUpdateProductQuantity({ product, isIncrease: true })
          }
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
