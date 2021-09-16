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
  ({ product, user }) => {
    console.log("---------------->", user.id);
    const cart = localStorage.getItem("cart");
    if (cart) {
      const carrito = JSON.parse(cart);
      const isRepeat = carrito.some((item) => item.id === product.id);

      if (isRepeat) {
        console.log(
          "ESTE PRODUCTO YA FUE AGREGADO, MODIFIQUE LA CANTIDAD EN EL CARRITO"
        );
      } else {
        carrito.push(product);
        localStorage.setItem("cart", JSON.stringify(carrito));
      }
      if (user.id) axios.put(`/api/cart/${user.id}/add`, product);
      return carrito;
    } else {
      localStorage.setItem("cart", JSON.stringify([product]));
    }
    if (user.id) axios.put(`/api/cart/${user.id}/add`, product);
    return product;
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

export const clearLocalCart = createAction("CLEARLOCALCART", () => {
  localStorage.removeItem("cart");
  return { payload: [] };
});

export const deleteProduct = createAsyncThunk(
  "DELETEPRODUCT",
  (productId, thunkAPI) => {
    const { cart, user } = thunkAPI.getState();
    console.log("----------------->", cart);
    const newCart = cart.filter((item) => {
      return item.id !== productId;
    });
    console.log(newCart, user);
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
    console.log("--------------->", action);
    return action.payload;
  },
  [getUserCart.fulfilled]: (state, action) => action.payload,
  [clearLocalCart]: (state, action) => action.payload,
  [deleteProduct.fulfilled]: (state, action) => {
    console.log("actioooooon", action);
    return action.payload;
  },
  /* [addToCart.fulfilled]: (state, action) => action.payload,
  [getCart.fulfilled]: (state, action) => action.payload, */
});

export default cartReducer;
