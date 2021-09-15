import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

/* export const addToCart = createAsyncThunk("addToCart", (id, product) => {
  return axios.put(`/api/cart/${id}/add`, product).then((res) => res.data);
});

export const getCart = createAsyncThunk("getCart", (id) => {
  return axios.get(`/api/cart/${id}`).then((res) => res.data);
}); */

export const addToLocalCart = createAction("addToCart", (product) => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    const carrito = JSON.parse(cart);
    const repeat = carrito.some((item) => item.id === product.id);

    if (repeat) {
      console.log(
        "ESTE PRODUCTO YA FUE AGREGADO, MODIFIQUE LA CANTIDAD EN EL CARRITO"
      );
    } else {
      carrito.push(product);
      localStorage.setItem("cart", JSON.stringify(carrito));
    }
    return { payload: carrito };
  } else {
    localStorage.setItem("cart", JSON.stringify([product]));
  }
  return { payload: product };
});

export const setLocalCart = createAction("SETLOCALCART", (cart) => {
  return { payload: cart };
});

export const setQuantity = createAction(
  "SETQUANTITY",
  ([productId, quantity]) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((item) => {
      if (item.id === productId) item.quantity = quantity;
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    return { payload: newCart };
  }
);

const initialState = [];

const cartReducer = createReducer(initialState, {
  [addToLocalCart]: (state, action) => action.payload,
  [setLocalCart]: (state, action) => action.payload,
  [setQuantity]: (state, action) => {
    console.log(action.payload);
    return action.payload;
  },
  /* [addToCart.fulfilled]: (state, action) => action.payload,
  [getCart.fulfilled]: (state, action) => action.payload, */
});

export default cartReducer;
