import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import App from "./App";
// import { makeServer } from "./server";
import {
  AuthContextProvider,
  CartContextProvider,
  ProductsContextProvider,
  WishlistContextProvider,
  CheckoutProvider,
} from "./contexts";

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <CheckoutProvider>
              <Router>
                <App />
              </Router>
            </CheckoutProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
