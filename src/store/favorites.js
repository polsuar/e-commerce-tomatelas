import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getUserFavorites = createAsyncThunk(
  "GET_USER_FAVORITES",
  (userId) => {
    return axios.get(`/api/favorites/${userId}`).then((res) => res.data); //  ID=4
  }
);

export const addFavorite = createAsyncThunk(
  "ADD_FAVORITE",
  ({ userId, productId }) => {
    return axios
      .post(`/api/favorites/${userId}?productId=${productId}`)
      .then((res) => res.data); // el server envia ID del favorito eliminado (lo uso en reducer)
  }
);

export const removeFavorite = createAsyncThunk(
  "REMOVE_FAVORITE",
  ({ userId, productId }) => {
    return axios
      .delete(`/api/favorites/${userId}?productId=${productId}`)
      .then((res) => res.data); // devuelve productId
  }
);

export const removeAllFavorites = createAsyncThunk(
  "REMOVE_ALL_FAVORITES",
  (userId) => {
    return axios.delete(`/api/favorites/all/${userId}`).then((res) => res.data);
  }
);

export const clearState = createAction("CLEAR_STATE", () => {
  return [];
});
const initialState = [];

const favoritesReducer = createReducer(initialState, {
  [getUserFavorites.fulfilled]: (state, action) => action.payload,
  [addFavorite.fulfilled]: (state, action) => [...state, action.payload],

  [removeFavorite.fulfilled]: (state, action) => {
    return state.filter((fav) => fav.id !== action.payload);
  },

  [removeAllFavorites.fulfilled]: (state, action) => action.payload,
  [clearState]: (state, action) => {
    let logOut = state;
    logOut = [];
    return logOut;
  },
});

export default favoritesReducer;
