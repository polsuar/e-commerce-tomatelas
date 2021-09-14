import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/login" />;
      }}
    />
  );
}
