import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk("GETALLPRODUCTS", () => {
  return axios.get(`/api/products/`).then((res) => res.data);
});

export const getProductsByName = createAsyncThunk(
  "GETPRODUCTSBYNAME",
  (name) => {
    return axios.get(`/api/products/name/${name}`).then((res) => res.data);
  }
);

const initialState = [];

const productsReducer = createReducer(initialState, {
  [getAllProducts.fulfilled]: (state, action) => action.payload,
  [getProductsByName.fulfilled]: (state, action) => action.payload,
});

export default productsReducer;
