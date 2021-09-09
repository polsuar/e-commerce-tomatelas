import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./users";

// import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
  },
});

// el objeto que tenemos dentro de reducer va a ser como se define nuestro estado.
// se recibe solo un objeto dentro de createStore

// los keys del objeto
//The Redux store doesn't care what the actual text of the action.type field is.
export default store;
