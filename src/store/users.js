import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const userLogin = createAction("USER_LOGIN");

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

const userReducer = createReducer(
  {},
  {
    [userLogin]: (state, action) => action.payload,
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
