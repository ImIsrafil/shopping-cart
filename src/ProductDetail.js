import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdAlert } from "react-icons/io";
import { BsCartPlus, BsCartX } from "react-icons/bs";

const ProductDetail = ({
  products,
  cart,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  const { id } = useParams();
  const product = products.find((product) => product.id.toString() === id);
  const hasProduct = cart.find(
    (item) => item.title.includes(product.title) && item.id === product.id
  );
  return (
    <div className="container">
      {product ? (
        <div className="productDetail">
          <img src={product.image} alt={product.title} />
          <div>
            <h6 className="product-title">{product.title}</h6>
            <p className="product-price">${product.price}</p>
            {hasProduct ? (
              <button
                onClick={() => handleRemoveFromCart(product)}
                className="btn cart remove"
              >
                Remove <BsCartX />
              </button>
            ) : (
              <button
                className="btn cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart <BsCartPlus />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="notice">
          <div className="icon">
            <IoMdAlert />
          </div>
          <div>
            <p>Invalid product or product is unavailable</p>

            <Link to="/">Go to home</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
