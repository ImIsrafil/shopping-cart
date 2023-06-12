import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Cart from "./Cart";
import NotFound from "./NotFound";
import About from "./About";
import ProductDetail from "./ProductDetail";
import { AppContextProvider } from "./context/AppContext";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <AppContextProvider>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/product/:id">
            <ProductDetail />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/about" component={About}></Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </AppContextProvider>
      <Footer />
    </div>
  );
}

export default App;
