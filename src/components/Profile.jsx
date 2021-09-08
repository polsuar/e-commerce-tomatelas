import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { useInput } from "../hooks/useInput";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { userLogin } from "../store/users";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Profile() {
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

  return (
    <>
      <div>hola , estas en tu perfil de usuario</div>

      <Link
        to="/register"
        style={{ color: "red" }}
        activeStyle={{ color: "red" }}
      >
        <button>Ir a registro</button>
      </Link>
    </>
  );
}
