import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { userLogin } from "../store/users";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    marginTop: 200,
    padding: 50,
    alignItems: "center",
  },
  btnLogin: {
    margin: 10,
    marginTop: 30,
  },
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const key = "login";
  const history = useHistory();

  const userName = useInput("userName");
  const password = useInput("password");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userName.value, password.value);
    const data = {
      userName: userName.value,
      password: password.value,
    };

    dispatch(userLogin(data)).then(() => {
      history.push("/");
    });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div>
        <h2> Login de usuario:</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de usuario"
                name="userName"
                value={userName.value}
                onChange={userName.onChange}
                size="small"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                value={password.value}
                onChange={password.onChange}
                size="small"
                type="password"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btnLogin}
              >
                Entrá a tu cuenta
              </Button>

              <Grid item>
                <RouterLink to="/register">
                  Todavía no tienes cuenta ?
                </RouterLink>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
