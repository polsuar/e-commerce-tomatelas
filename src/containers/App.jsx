import React from "react";
import Register from "./Register";
import Profile from "../components/Profile";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../containers/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";

//IMPORT DE PRUEBA
import SingleProductView from "../components/SingleProductView";

export default function App() {
  return (
    <>
      <div>
        Bienvenidos al e-commerce de Tomatelas!
        <SingleProductView />
      </div>
      <Router>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>
      </Router>
    </>
  );
}
