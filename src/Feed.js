import React from "react";
import Product from "./Product";

const Feed = ({ searchResult }) => {
  return (
    <div className="feed container">
      {searchResult.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Feed;
