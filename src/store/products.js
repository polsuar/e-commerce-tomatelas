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
  (productId, thunkAPI) => {
    const { products } = thunkAPI.getState();
    axios.delete(`/api/products/${productId}`).then((res) => res.data);
    const newProducts = products.filter((product) => {
      return product.id !== productId;
    });
    return newProducts;
  }
);
export const editProduct = createAsyncThunk("EDIT_PRODUCT", ({ id, edit }) => {
  return axios.put(`/api/products/${id}`, edit).then((res) => res.data);
});

export const addProduct = createAsyncThunk("ADD_PRODUCT", (edit) => {
  console.log(edit)
  return axios.post(`/api/products/`, edit).then((res) => res.data);
});
export const getProductsByCategory = createAsyncThunk(
  "GETPRODUCTSBYCATEGORY",
  (categotyId) => {
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
  [removeProduct.fulfilled]: (state, action) => action.payload,
  [addProduct.fulfilled]: (state, action) => [...state, action.payload],
  [getProductsByCategory.fulfilled]: (state, action) => action.payload,
  [getProductsByBrand.fulfilled]: (state, action) => action.payload,
});

export default productsReducer;
