import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  container: {
    display: "flex",
    marginTop: 150,
    padding: 5,
    alignItems: "center",
  },
  grid: {
    padding: 10,
  },
  btnRegister: {
    margin: 10,
    marginTop: 30,
  },
  snackbar: {
    whiteSpace: "pre-wrap",
  },
});

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors }, // get the errors object
  } = useForm();

  const [state, setState] = useState();
  const [messageInfo, setMessageInfo] = useState(undefined);

  React.useEffect(() => {
    if (errors || messageInfo) {
      setState({ open: true });
    }
  }, [errors, messageInfo]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ open: false });
  };

  const propertyValues = Object.values(errors);
  const errorsArr = propertyValues.map((el) => el.message);

  const sendEmail = (data) => {
    emailjs
      .send(
        "service_nwzoqrw",
        "template_mrqbsy5",
        data,
        "user_XCxOcDMqNx5iPI6zMfMzI"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const onSubmit = (data) => {
    console.log("acaaaaa", JSON.stringify(data, null, 2));

    return (
      axios
        .post("http://localhost:3001/api/auth/register", data)
        //      .then((r) => r.data)
        .then((res) => {
          const message = {
            bodyMessage:
              "Registro exitoso, esperamos que disfrutes de nuestros servicio ideado especialmente para ti =)",
            subjectMessage: "Registro exitoso",
            userName: res.data.userName,
            email: res.data.email,
          };
          // message.userName = ;
          // message.email = ;

          sendEmail(message);
          return history.push("/login");
        })
        .catch((error) => {
          console.log("ERROR RESPONSE DATA ====>", error.response.data);
          if (error.response.data === "User Already Exist. Please Login") {
            setMessageInfo(
              "Error: el usuario ya existe.\nPor favor, utiliza una casilla de mail diferente u otro nombre de usuario."
            );
          }
        })
    );
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div>
        <h2>Registro</h2>

        {errorsArr?.length > 0 || messageInfo ? (
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
                {errorsArr.reduce((acum, error) => {
                  acum = acum + "- " + error + ".\n ";
                  return acum;
                }, "")}
              </div>
            </Alert>
          </Snackbar>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} className={classes.grid}>
            <Grid item xs={6}>
              <Controller
                name="userName"
                control={control}
                defaultValue=""
                rules={{
                  required: "El nombre de usuario es requerido",
                  maxLength: {
                    value: 20,
                    message:
                      "El nombre de usuario debe ser menos de 20 caracteres",
                  },
                }}
                fullWidth
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Nombre de usuario"
                    error={errors.firstName ? true : false}
                  />
                )}
              />
              {/* {errors.userName && (
                <span role="alert">Campo de usuario requerido</span>
              )} */}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "El mail es requerido",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Debes usar un mail valido, por favor corrigelo.",
                  },
                }}
                fullWidth
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Email (*)"
                    type="email"
                  />
                )}
              />
              {/* {errors.email && (
                <span role="alert">Campo de email requerido</span>
              )} */}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "El password es requerido",
                  maxLength: {
                    value: 20,
                    message:
                      "El password debe ser menos de 20 caracteres y contener al menos una letra y un numero.",
                  },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                    message:
                      "El password es requerido: al menos una letra y un numero",
                  },
                }}
                fullWidth
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Password (*)"
                    type="password"
                  />
                )}
              />

              {/* {errors.password && (
                <span role="alert">{errors.password.message}</span>
              )} */}
            </Grid>

            <Grid item xs={12} sm={2}>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <Select onChange={onChange} value={value}>
                    <MenuItem value="man">Hombre</MenuItem>
                    <MenuItem value="woman">Mujer</MenuItem>
                    <MenuItem value="other">Otro</MenuItem>
                  </Select>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Nombre completo"
                  />
                )}
                name="firstName"
                control={control}
                defaultValue=""
                rules={{
                  required: "El Nombre completo es requerido",
                }}
                fullWidth
              />
              {/* {errors.firstName && <span role="alert">Nombre requerido!</span>} */}
            </Grid>
            <Grid item xs={12} sm={5}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Apellido (*)"
                  />
                )}
                name="lastName"
                control={control}
                defaultValue=""
                rules={{
                  required: "El Apellido es requerido",
                }}
                fullWidth
              />
              {/* {errors.lastName && <span role="alert">Apellido requerido!</span>} */}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField value={value} onChange={onChange} label="Calle" />
                )}
                name="street"
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Provincia"
                  />
                )}
                name="province"
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField value={value} onChange={onChange} label="Ciudad" />
                )}
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Codigo Postal"
                  />
                )}
                name="zipcode"
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                  maxLength: {
                    value: 20,
                    message: "El Codigo Postal debe ser menos de 20 caracteres",
                  },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Telefono"
                  />
                )}
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                  maxLength: {
                    value: 20,
                    message: "El telefono debe ser menos de 20 digitos",
                  },
                }}
                fullWidth
              />
              {/* {errors.phone && (
                <span role="alert">Ingresa 9 digitos maximos</span>
              )} */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // disabled={!form.isValid}
            className={classes.btnRegister}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" href="#" variant="body2">
                Ya tienes una cuenta? Ingresa aqui.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
