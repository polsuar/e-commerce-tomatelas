import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "axios";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Chip from "@material-ui/core/Chip";

import FaceIcon from "@material-ui/icons/Face";
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
// icons

import DeleteIcon from "@material-ui/icons/Delete";
import { RemoveCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    marginTop: 0,
    padding: 2,
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

const ProfileUserInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch(); // para actualizar datos
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors }, // get the errors object
  } = useForm();

  const [status, setStatus] = useState({ open: false });
  const [messageInfo, setMessageInfo] = useState("");
  const [showPass, setShowPass] = useState(false);

  console.log(errors);

  React.useEffect(() => {
    if (errors || messageInfo) {
      setStatus({ open: true });
    }
  }, [errors, messageInfo]);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));

    return (
      axios
        .put(`http://localhost:3001/api/users/update/${user.id}`, data)
        //      .then((r) => r.data)
        .then((r) => {
          console.log("DATOS MODIFICADOS => NUEVO USUARIO: ====> ", r.data);
          setMessageInfo("¡Datos modificados con éxito!");
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

  const handleClose = () => {
    setStatus({ open: false });
    setMessageInfo("");

    return;
  };

  const propertyValues = Object.values(errors);
  const errorsArr = propertyValues?.map((el) => el.message);

  return (
    <>
      {errorsArr.length > 0 || messageInfo ? (
        <Snackbar
          open={status.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className={classes.snackbar}
        >
          <Alert
            severity={
              messageInfo === "¡Datos modificados con éxito!"
                ? "success"
                : "error"
            }
          >
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
              }}
            >
              {messageInfo}
              {errorsArr?.reduce((acum, error) => {
                acum = acum + "- " + error + ".\n ";
                return acum;
              }, "")}
            </div>
          </Alert>
        </Snackbar>
      ) : null}

      <Container component="main" maxWidth="xs" className={classes.container}>
        <div align="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4} className={classes.grid}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} align="left"></TableCell>
                    <TableCell colSpan={10} align="center">
                      <h3>
                        Datos de cuenta{" "}
                        <Chip
                          icon={<FaceIcon />}
                          label={user.userName}
                          variant="outlined"
                        />
                      </h3>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Grid item xs={6}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user.email}
                  rules={{
                    required: "El mail es requerido",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message:
                        "Debes usar un mail valido, por favor corrigelo.",
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

              <Grid item xs={6}>
                <Chip
                  avatar={<Avatar>P</Avatar>}
                  label="Modificar password"
                  onClick={() => setShowPass((prev) => !prev)}
                />
              </Grid>

              <Grid item xs={6}>
                {showPass && (
                  <Controller
                    name="password"
                    className="passwordPanel"
                    control={control}
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
                )}
              </Grid>
              <Grid item xs={6}></Grid>

              {/* {errors.password && (
                <span role="alert">{errors.password.message}</span>
              )} */}

              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      <h3>Datos personales</h3>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Grid item xs={12} sm={6}>
                <Controller
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      label="Nombre completo (*)"
                    />
                  )}
                  name="firstName"
                  control={control}
                  defaultValue={user.firstName}
                  rules={{
                    required: "El Nombre completo es requerido",
                  }}
                  fullWidth
                />
                {/* {errors.firstName && <span role="alert">Nombre requerido!</span>} */}
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  defaultValue={user.lastName}
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
                    <TextField
                      value={value}
                      onChange={onChange}
                      defaultValue={user.street}
                      label="Calle"
                    />
                  )}
                  name="street"
                  control={control}
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
                      defaultValue={user.province}
                      label="Provincia"
                    />
                  )}
                  name="province"
                  control={control}
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
                      defaultValue={user.city}
                      label="Ciudad"
                    />
                  )}
                  name="city"
                  control={control}
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
                      defaultValue={user.zipcode}
                      label="Codigo Postal"
                    />
                  )}
                  name="zipcode"
                  control={control}
                  rules={{
                    required: false,
                    maxLength: {
                      value: 20,
                      message:
                        "El Codigo Postal debe ser menos de 20 caracteres",
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
                      defaultValue={user.phone}
                      label="Telefono"
                    />
                  )}
                  name="phone"
                  control={control}
                  rules={{
                    required: false,
                    maxLength: {
                      value: 20,
                      message: "El telefono debe ser menos de 20 digitos",
                    },
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.btnRegister}
            >
              Actualizar datos
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ProfileUserInfo;
