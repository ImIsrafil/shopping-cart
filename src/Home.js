import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import Feed from "./Feed";

const Home = () => {
  const { searchResult, fetchError, isLoading } = useContext(AppContext);
  return (
    <div className="home">
      {isLoading ? (
        <p style={{ color: "green", textAlign: "center" }}>
          Loading Products...
        </p>
      ) : fetchError ? (
        <p style={{ color: "red", textAlign: "center" }}>{fetchError}</p>
      ) : searchResult.length ? (
        <Feed searchResult={searchResult} />
      ) : (
        <p style={{ color: "green", textAlign: "center" }}>
          No products to display
        </p>
      )}
    </div>
  );
};

export default Home;
