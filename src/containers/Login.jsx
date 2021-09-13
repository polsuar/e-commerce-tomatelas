import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { userLogin } from "../store/users";
import { useDispatch } from "react-redux";
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
  snackbar: {
    whiteSpace: "pre-wrap",
  },
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const key = "login";
  const history = useHistory();

  const userName = useInput("userName");
  const password = useInput("password");
  const [state, setState] = useState();
  const [messageInfo, setMessageInfo] = useState(undefined);

  React.useEffect(() => {
    if (messageInfo) {
      setState({ open: true });
    }
  }, [messageInfo]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ open: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userName.value, password.value);
    const data = {
      userName: userName.value,
      password: password.value,
    };

    dispatch(userLogin(data))
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log("ERROR ===> ", error.response.data);
        if (error.response.data === "Invalid Credentials") {
          setMessageInfo(
            "Credenciales invalidas, por favor verifica los campos ingresados."
          );
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div>
        <h2> Login de usuario:</h2>

        {messageInfo ? (
          <Snackbar
            open={state.open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            className={classes.snackbar}
          >
            <Alert severity="error" onClose={handleClose}>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                }}
              >
                {messageInfo}
              </div>
            </Alert>
          </Snackbar>
        ) : null}

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
