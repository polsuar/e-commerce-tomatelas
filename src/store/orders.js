import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export const setOrder = createAsyncThunk("SETORDER", (data) => {
  const { date, user, cart, precioFinal } = data;
  return axios.post(`/api/orders/add`, data).then((res) => {
    return res.data;
  });
});

export const getUserOrders = createAsyncThunk("GET_USER_ORDERS", (userId) => {
  return axios.get(`/api/orders/user/${userId}`).then((res) => {
    return res.data;
  });
});

const initialState = [];

const ordersReducer = createReducer(initialState, {
  [setOrder.fulfilled]: (state, action) => action.payload,
  [getUserOrders.fulfilled]: (state, action) => action.payload,
});

export default ordersReducer;
