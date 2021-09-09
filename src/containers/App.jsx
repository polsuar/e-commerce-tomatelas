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

<<<<<<< HEAD
=======
import { BrowserRouter as Router, Route } from "react-router-dom";

import SingleProductView from "../components/SingleProductView";
import Ranceada from "../components/ranceada";

>>>>>>> ef03172d302ab142b5f88d254c938cda0cecf4ea
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

          <Redirect from="/" to="/home" />
        </Switch>
      </ThemeProvider>
    </>
  );
}
