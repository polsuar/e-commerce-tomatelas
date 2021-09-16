import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const setLocalUser = createAction("GETLOCALUSER", (user) => {
  console.log("setLocalUser", user);
  return { payload: user };
});

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
  //  const key = "login";
  return axios
    .post("http://localhost:3001/api/auth/login", {
      userName,
      password,
    })
    .then((r) => {
      //message.success({ content: "Login success!!", key, duration: 2 });
      console.log("login success");
      localStorage.setItem("token", r.data.token);
      localStorage.setItem("user", JSON.stringify(r.data));
      return r.data;
    });
});

export const userLogout = createAction("LOGOUT", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {};
});

const userReducer = createReducer(
  {},
  {
    [setLocalUser]: (state, action) => action.payload,
    [userLogin.fulfilled]: (state, action) => action.payload,
    [userLogout]: (state, action) => {
      let logOut = state;
      logOut = {};
      return logOut;
    },
    [userLogin.rejected]: (state, action) => action.payload,
    // [userLogout.fulfilled]: (state, action) => {
    //   state = {};
    //   return state;
    // },
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
