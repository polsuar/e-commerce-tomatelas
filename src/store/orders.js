import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export const setOrder = createAsyncThunk("SETORDER", (cart) => {
  return axios.get(`/api/orders/add`).then((res) => res.data);
});

const initialState = [];

const ordersReducer = createReducer(initialState, {
  [setOrder.fulfilled]: (state, action) => action.payload,
});

export default ordersReducer;
