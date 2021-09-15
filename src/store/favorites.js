import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserFavorites = createAsyncThunk(
  "GET_USER_FAVORITES",
  (userId) => {
    console.log("USER ID EN ASYNCTHUNKS", userId);
    return axios.get(`/api/favorites/${userId}`).then((res) => res.data);
  }
);

const initialState = [];

const favoritesReducer = createReducer(initialState, {
  [getUserFavorites.fulfilled]: (state, action) => action.payload,
});

export default favoritesReducer;
