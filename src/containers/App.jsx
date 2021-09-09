import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Navbar from "../components/Navbar";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../themeConfig";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route exact path="/home" render={() => <Home />} />
          {/* <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/register" render={() => <Register />} /> */}
          <Redirect from="/" to="/home" />
        </Switch>
      </ThemeProvider>
    </>
  );
}
