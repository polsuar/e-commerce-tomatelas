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
import { FormControl } from "@material-ui/core";
import { userSignUp } from "../store/users";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";

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
    console.log(JSON.stringify(data, null, 2));

    return (
      axios
        .post("/api/auth/register", data)
        //      .then((r) => r.data)
        .then(() => {
          return history.push("/login");
        })
        .catch((err) => console.log(err))
    );
    // .then((data) => history.push

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
                name="userName"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: 15 }}
                fullWidth
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Nombre de usuario"
                  />
                )}
              />
              {errors.userName && (
                <span role="alert">Campo de usuario requerido</span>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: 30 }}
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
              {errors.email && (
                <span role="alert">Campo de email requerido</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true, maxLength: 15 }}
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

              {errors.password && <span role="alert">Password requerido!</span>}
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
                rules={{ required: true, maxLength: 20 }}
                fullWidth
              />
              {errors.firstName && <span role="alert">Nombre requerido!</span>}
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
                rules={{ required: true, maxLength: 20 }}
                fullWidth
              />
              {errors.lastName && <span role="alert">Apellido requerido!</span>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <TextField value={value} onChange={onChange} label="Calle" />
                )}
                name="street"
                control={control}
                defaultValue=""
                rules={{ required: false, maxLength: 20 }}
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
                rules={{ required: false, maxLength: 20 }}
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
                rules={{ required: false, maxLength: 20 }}
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
                rules={{ required: false, maxLength: 20 }}
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
                rules={{ required: false, maxLength: 15 }}
                fullWidth
              />
              {errors.phone && (
                <span role="alert">Ingresa 9 digitos maximos</span>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

            // disabled={!form.isValid}
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
