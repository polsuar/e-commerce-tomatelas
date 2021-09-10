import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listProducts = createAsyncThunk("LIST", () => {
  return axios.get("/api/products/").then((res) => res.data);
});

const initialState = [];

const productsReducer = createReducer(initialState, {
  [listProducts.fulfilled]: (state, action) => action.payload,
});

export default productsReducer;
