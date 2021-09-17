import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

/* export const addToCart = createAsyncThunk("addToCart", (id, product) => {
  return axios.put(`/api/cart/${id}/add`, product).then((res) => res.data);
});
*/
export const getUserCart = createAsyncThunk("GETUSERCART", (id) => {
  return axios.get(`/api/cart/${id}`).then((res) => {
    if (res.data.cart_items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(res.data.cart_items));
      return res.data.cart_items;
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      if (localCart) {
        axios.put(`/api/cart/${id}/add`, localCart).then((res) => res.data);
      }
    }
  });
});

export const addToLocalCart = createAsyncThunk(
  "addToCart",
  (product, thunkAPI) => {
    const { user } = thunkAPI.getState();
    const cart = localStorage.getItem("cart");
    if (cart) {
      const carrito = JSON.parse(cart);
      const isRepeat = carrito.some((item) => item.id === product.id);

      if (isRepeat) {
        return;
      } else {
        carrito.push(product);
        localStorage.setItem("cart", JSON.stringify(carrito));
        if (user.id) axios.put(`/api/cart/${user.id}/add`, product);
        return carrito;
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([product]));
      if (user.id) axios.put(`/api/cart/${user.id}/add`, product);
      return product;
    }
  }
);

export const setLocalCart = createAction("SETLOCALCART", (cart) => {
  return { payload: cart };
});

export const setQuantity = createAsyncThunk("SETQUANTITY", (data) => {
  const { productId, quantity, id } = data;
  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.map((item) => {
    if (item.id === productId) item.quantity = quantity;
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(newCart));
  axios.put(`/api/cart/${id}/put`, { productId, quantity });
  return newCart;
});

export const clearLocalCart = createAsyncThunk("CLEARLOCALCART", (id) => {
  localStorage.removeItem("cart");
  axios.delete(`/api/cart/${id}/clear`);
  return [];
});

export const deleteProduct = createAsyncThunk(
  "DELETEPRODUCT",
  (productId, thunkAPI) => {
    const { cart, user } = thunkAPI.getState();
    const newCart = cart.filter((item) => {
      return item.id !== productId;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    axios.put(`/api/cart/${user.id}/delete`, { productId });
    return newCart;
  }
);

const initialState = [];

const cartReducer = createReducer(initialState, {
  [addToLocalCart.fulfilled]: (state, action) => action.payload,
  [setLocalCart]: (state, action) => action.payload,
  [setQuantity.fulfilled]: (state, action) => {
    return action.payload;
  },
  [getUserCart.fulfilled]: (state, action) => action.payload,
  [clearLocalCart.fulfilled]: (state, action) => action.payload,
  [deleteProduct.fulfilled]: (state, action) => {
    return action.payload;
  },
  /* [addToCart.fulfilled]: (state, action) => action.payload,
  [getCart.fulfilled]: (state, action) => action.payload, */
});

export default cartReducer;
