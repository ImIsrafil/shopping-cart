import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import useFetchData from "./hooks/useFetchData";
import api from "./api/products";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Cart from "./Cart";
import NotFound from "./NotFound";
import About from "./About";
import ProductDetail from "./ProductDetail";

function App() {
  const {
    data: fetchedProducts,
    fetchError,
    isLoading,
  } = useFetchData("http://localhost:3500/products");
  const { data: fetchCart } = useFetchData("http://localhost:3500/cart");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setProducts(fetchedProducts);
    setCart(fetchCart);
  }, [fetchedProducts, fetchCart]);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredProducts);
  }, [search, products]);

  const handleAddToCart = async (product) => {
    const hasProduct = cart.find(
      (item) => item.title.includes(product.title) && item.id === product.id
    );
    if (hasProduct) {
      alert("!Product has already been in cart");
    } else {
      try {
        const resposne = await api.post("/cart", product);
        const allItems = [...cart, resposne.data];
        setCart(allItems);
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

  const handleRemoveFromCart = async (product) => {
    const hasProduct = cart.find(
      (item) => item.title.includes(product.title) && item.id === product.id
    );
    if (hasProduct) {
      try {
        await api.delete(`/cart/${product.id}`);
        const remainingCart = cart.filter(
          (item) =>
            !item.title.includes(product.title) && item.id !== product.id
        );
        setCart(remainingCart);
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

  const handleUpdateProductQuantity = async (product, isIncrease) => {
    const hasProduct = cart.find(
      (item) => item.id === product.id && item.title.includes(product.title)
    );
    if (hasProduct) {
      let quantity = 1;
      if (isIncrease) {
        quantity = hasProduct.quantity ? hasProduct.quantity + 1 : 1 + 1;
      } else {
        quantity =
          hasProduct.quantity && hasProduct.quantity < 1
            ? hasProduct.quantity - 1
            : 1;
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
    <div className="App">
      <Header />
      <Nav search={search} setSearch={setSearch} cart={cart} />
      <Switch>
        <Route exact path="/">
          <Home
            searchResult={searchResult}
            fetchError={fetchError}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/product/:id">
          <ProductDetail
            products={products}
            cart={cart}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </Route>
        <Route exact path="/cart">
          <Cart
            products={products}
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleUpdateProductQuantity={handleUpdateProductQuantity}
          />
        </Route>
        <Route path="/about" component={About}></Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
