import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("GETALLUSERS", () => {
  return axios.get(`/api/users/`).then((res) => res.data)
  .then((users)=>users.sort((a,b)=>a.id-b.id));
});

export const removeUser = createAsyncThunk(
  "REMOVE_USER",
  (userId, thunkAPI) => {
    const { userlist } = thunkAPI.getState();
    axios.delete(`/api/users/${userId}`).then((res) => res.data);
    const newList = userlist.filter((user) => {
      return user.id !== userId;
    });
    return newList;
  }
);

export const promoteAdmin = createAsyncThunk(
  "PROMOTE_ADMIN",
  (userId, thunkAPI) => {
    axios.put(`/api/users/promote/${userId}`)
    return axios.get(`/api/users/`).then((res) => res.data.sort((a,b)=>a.id-b.id))
    });

export const revokeAdmin = createAsyncThunk(
  "REVOKE_ADMIN",
  (userId, thunkAPI) => {
    axios.put(`/api/users/revoke/${userId}`)
    return axios.get(`/api/users/`).then((res) => res.data.sort((a,b)=>a.id-b.id))
    });

// export const revokeAdmin = createAsyncThunk("REVOKE_ADMIN", (userId) => {
//   return axios.put(`/api/users/revoke/${userId}`).then((res) => res.data);
// });
const initialState = [];

const userlistReducer = createReducer(initialState, {
  [getAllUsers.fulfilled]: (state, action) => action.payload,
  [removeUser.fulfilled]: (state, action) => action.payload,
  [promoteAdmin.fulfilled]: (state, action) => action.payload,
  [revokeAdmin.fulfilled]: (state, action) => action.payload,
});

export default userlistReducer;
