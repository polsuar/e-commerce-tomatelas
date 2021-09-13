import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const userSignUp = createAsyncThunk("USER_SIGNUP", (obj) => {
  const dispatch = useDispatch();

  console.log("OBJ => ", obj);
  return axios
    .post("http://localhost:3001/api/signup", obj)
    .then((r) => r.data)
    .then((data) => dispatch(userLogin(data)))
    .catch((err) => console.log(err));

  // return axios.post("/api/signup").then((r) => r.data);
});

export const userLogin = createAsyncThunk("LOGIN", ({ userName, password }) => {
  return axios
    .post("http://localhost:3001/api/auth/login", {
      userName,
      password,
    })
    .then((r) => {
      console.log(" USUARIO LOGUEADO CORRECTAMENTE => ", r);
      //  history.push("/");
      return r.data;
    });
  // .catch((error) => {
  //   console.log("ERROR EN ASYNCTHYUNK", error.response.data);
  //   const customError = {
  //     name: "Custom axios error",
  //     message: error.response.statusText,
  //     data: error.response.data, // serializable
  //   };
  // return customError;
  // message.error({ content: "Missing credentials", key, duration: 2 });
});

const userReducer = createReducer(
  {},
  {
    [userLogin.fulfilled]: (state, action) => {
      return action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      return { ...state, error: "custom error" };
    },
    [userSignUp.fulfilled]: (state, action) => action.payload,
    // [addUser.rejected]: (state,  action) => action.payload,

    // [removeFromFavorites.fulfilled]: (state, action) => {
    //   state.favorites = state.favorites.filter(
    //     (fav) => fav.id !== action.payload.id
    //   );
    // },
  }
);

export default userReducer;
