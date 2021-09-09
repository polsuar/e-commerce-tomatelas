import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listProducs = createAsyncThunk("LIST", () => {
  return axios.get("").then((res) => res.data);
});

const initialState = [];

const productsReducer = createReducer(initialState, {
  [listProducs.fulfilled]: (state, action) => action.payload,
});

export default productsReducer;
