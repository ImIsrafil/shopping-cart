import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt="product.title" />
        <div>
          <h6 className="product-title">
            {product.title.length > 25
              ? product.title.slice(0, 25) + " ..."
              : product.title}
          </h6>
          <small className="product-price">$ {product.price}</small>
        </div>
      </Link>
    </div>
  );
};

export default Product;
