import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Navbar from "../components/Navbar";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../themeConfig";
import Register from "./Register";
import Profile from "../components/Profile";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../containers/Login";
import SingleProductView from "../components/SingleProductView";

export default function App() {
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

          <Route path="/single-product">
            <SingleProductView />
          </Route>

          <Redirect from="/" to="/home" />
        </Switch>
      </ThemeProvider>
    </>
  );
}
