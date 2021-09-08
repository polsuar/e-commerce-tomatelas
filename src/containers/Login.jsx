import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { userLogin } from "../store/users";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id) {
      console.log("== USUARIO DESDE LOGIN ==> ", user);
      /*
      dispatch(getFavorites(user.id))
        .then((data) =>
          //message.success(`Success login: welcome back ${data.name}`)
          console.log(`Favorites loaded from BD into state`, data)
        )
        .catch((err) => console.log(err));

        */
    } else return;
  }, [user.id]);

  return <>hola estas en login</>;
};

export default Login;
