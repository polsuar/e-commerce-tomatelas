import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("GETALLUSERS", () => {
  return axios.get(`/api/users/`).then((res) => res.data);
});

export const removeUser = createAsyncThunk(
  "REMOVE_USER",
  ({ userId, productId }) => {
    return axios
      .delete(`/api/users/${userId}`)
      .then((res) => res.data); // devuelve productId
  }
);



const initialState = [];

const userlistReducer = createReducer(initialState, {
  [getAllUsers.fulfilled]: (state, action) => action.payload,
  [removeUser.fulfilled]: (state, action) => {
    return state.filter((user) => user.id !== action.payload);
  },
});

export default userlistReducer;
