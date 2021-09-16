import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("GETALLUSERS", () => {
  return axios.get(`/api/users/`).then((res) => res.data);
});

export const removeUser = createAsyncThunk(
  "REMOVE_USER",
  ( userId) => {
    return axios
      .delete(`/api/users/${userId}`)
      .then((res) => res.data); // devuelve productId
  }
);

export const promoteAdmin = createAsyncThunk(
  "PROMOTE_ADMIN",
  (userId) => {
    return axios
      .put(`/api/user/promote/${userId}`)
      .then((res) => res.data); 
  }
);

export const revokeAdmin = createAsyncThunk(
  "REVOKE_ADMIN",
  (userId) => {
    return axios
      .put(`/api/user/promote/${userId}`)
      .then((res) => res.data); 
  }
);
const initialState = [];

const userlistReducer = createReducer(initialState, {
  [getAllUsers.fulfilled]: (state, action) => action.payload,
  [removeUser.fulfilled]: (state, action) => {
    return state.filter((user) => user.id !== action.payload);
  },
  [promoteAdmin.fulfilled]: (state, action) => [...state, action.payload],
  [revokeAdmin.fulfilled]: (state, action) => [...state, action.payload],
});

export default userlistReducer;
