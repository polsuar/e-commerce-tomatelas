import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./users";
import productsReducer from "./products";
import selectedProductReducer from "./selectedProduct";
import cartReducer from "./cart";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    cart: cartReducer,
  },
});

export default store;
