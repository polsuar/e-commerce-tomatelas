import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk("GETALLPRODUCTS", () => {
  return axios.get(`/api/products/`).then((res) => res.data);
});

export const getProductsByName = createAsyncThunk(
  "GETPRODUCTSBYNAME",
  (name) => {
    return axios.get(`/api/products/name/${name}`).then((res) => res.data);
  }
);

export const removeProduct = createAsyncThunk(
  "REMOVE_PRODUCT",
  (productId) => {
    return axios
      .delete(`/api/products/${productId}`)
      .then((res) => res.data); 
  }
);

export const editProduct = createAsyncThunk(
  "EDIT_PRODUCT",
  (productId) => {
    return axios
      .put(`/api/products/${productId}`)
      .then((res) => res.data); 
  }
);

export const addProduct = createAsyncThunk(
  "ADD_PRODUCT",
  ( productId ) => {
    return axios
      .post(`/api/products/${productId}`)
      .then((res) => res.data); 
    }
);
export const getProductsByCategory = createAsyncThunk(
  "GETPRODUCTSBYCATEGORY",
  (categotyId) => {
    console.log(categotyId);
    return axios.get(`/api/category/${categotyId}`).then((res) => res.data);
  }
);

export const getProductsByBrand = createAsyncThunk(
  "GETPRODUCTSBYBRAND",
  (brandName) => {
    return axios
      .get(`/api/products/brand/${brandName}`)
      .then((res) => res.data);
  }
);

const initialState = [];

const productsReducer = createReducer(initialState, {
  [getAllProducts.fulfilled]: (state, action) => action.payload,
  [getProductsByName.fulfilled]: (state, action) => action.payload,
  [editProduct.fulfilled]: (state, action) => [...state, action.payload],
  [removeProduct.fulfilled]: (state, action) => {
    return state.filter((prod) => prod.id !== action.payload);
  },
  [addProduct.fulfilled]: (state, action) => [...state, action.payload],
  [getProductsByCategory.fulfilled]: (state, action) => action.payload,
  [getProductsByBrand.fulfilled]: (state, action) => action.payload,
});

export default productsReducer;
