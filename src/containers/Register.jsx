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
//import { userLogin } from "../store/users";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { userSignUp } from "../store/users";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }, // get the errors object
  } = useForm();

  const onSubmit = (data) => {
    console.log("== DATOS DE REGISTRO ==> ", data);

    return (
      axios
        .post("/api/auth/register", data)
        .then((r) => r.data)
        // .then((data) => dispatch(userLogin(data)))
        .catch((err) => console.log(err))
    );

    //dispatch(userSignUp(data)).then(() => history.push("/profile"));
    //🔴 Do not call hooks in event handlers.  de la documentacion
  };

  /* PASOS DE REGISTRO 
1
 username = email = password =  
  // 2 Datos personales
 firstName   lastName =  gender = 
  // 3
street province city  zipcode  phone ;
  //4/ quieres subscribirte a nuestro newsletter de ofertas y novedades ?
*/

  function onChangeInput() {
    console.log("hola");
  }

  console.log("ERRORS => ", errors);
  return (
    <Container component="main" maxWidth="xs">
      <div>
        Registro
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: 15 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    label="Nombre de usuario"
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: 30 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    label="email"
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    label="Password"
                    type="password"
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel id="select-label">Género</InputLabel>

              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onChange={onChangeInput} value={value}>
                    <MenuItem value={"man"}>Hombre</MenuItem>
                    <MenuItem value={"woman"}>Mujer</MenuItem>
                    <MenuItem value={"other"}>Otro</MenuItem>
                  </Select>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Nombre"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Apellido"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="street"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Calle"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="province"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Provincia"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Ciudad"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="zipcode"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Codigo Postal"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Telefono"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

            // disabled={!form.isValid}
          >
            Sign Up
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
