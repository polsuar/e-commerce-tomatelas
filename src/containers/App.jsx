import React from "react";
import Register from "./Register";
import Profile from "../components/Profile";
import PrivateRoute from "../components/PrivateRoute";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div>Bienvenidos al e-commerce de Tomatelas!</div>
      <Router>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
      </Router>
    </>
  );
}
