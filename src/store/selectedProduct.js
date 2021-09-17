import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSelectedProduct = createAsyncThunk(
  "getSelectedProduct",
  (id) => {
    return axios.get(`/api/products/id/${id}`).then((res) => res.data);
  }
);

export const setQuantityProduct = createAction(
  "setQuantityProduct",
  ({ ev, product }) => {
    const obj = { ...product, quantity: ev };
    return { payload: obj };
  }
);

const initialState = {};

const selectedProductReducer = createReducer(initialState, {
  [getSelectedProduct.fulfilled]: (state, action) => action.payload,
  [setQuantityProduct]: (state, action) => action.payload,
});

export default selectedProductReducer;
