import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./users";
import productsReducer from "./products";
import selectedProductReducer from "./selectedProduct";
import cartReducer from "./cart";
import favoritesReducer from "./favorites";
import userlistReducer from "./userlist";
import ordersReducer from "./orders";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    userlist: userlistReducer,
    orders: ordersReducer,
  },
});

export default store;
