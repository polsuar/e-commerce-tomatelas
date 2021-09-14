import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../themeConfig";
import Register from "./Register";
import Profile from "../components/Profile";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../containers/Login";
import SingleProductView from "../components/SingleProductView";
import { useDispatch } from "react-redux";
import { setLocalUser } from "../store/users";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(setLocalUser(user));
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />

        <Switch>
          <Route exact path="/home" render={() => <Home />} />

          <Route path="/register">
            <Register />
          </Route>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route
            exact
            path="/products/:id"
            render={({ match }) => <SingleProductView id={match.params.id} />}
          />

          <Redirect from="/" to="/home" />
        </Switch>
      </ThemeProvider>
    </>
  );
}
