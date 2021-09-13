import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

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
      localStorage.setItem("token", r.data.token)
      return r.data;
    })
    .catch((error) => {
      console.log(error);
      // message.error({ content: "Missing credentials", key, duration: 2 });
    });
});

export const userLogout = createAction("LOGOUT", () => {
  localStorage.removeItem("token")
  return {}
})


const userReducer = createReducer(
  {},
  {
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
    [userLogout]: (state, action) => action.payload,
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
