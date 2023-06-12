import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import AppContext from "./context/AppContext";

const Nav = () => {
  const { search, setSearch, cart } = useContext(AppContext);
  return (
    <nav>
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            Search
            <FaSearch />
          </button>
        </form>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart <AiOutlineShoppingCart />
              <p className="cart-length">{cart.length}</p>
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
