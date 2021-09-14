import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk("addToCart", (id, product) => {
  return axios.put(`/api/cart/${id}/add`, product).then((res) => res.data);
});

export const getCart = createAsyncThunk("getCart", (id) => {
  return axios.get(`/api/cart/${id}`).then((res) => res.data);
});

const initialState = [];

const cartReducer = createReducer(initialState, {
  [addToCart.fulfilled]: (state, action) => action.payload,
  [getCart.fulfilled]: (state, action) => action.payload,
});

export default cartReducer;
