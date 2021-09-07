import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink } from "react-router-dom";
import { useInput } from "../hooks/useInput";

const onRegister = (e) => {
  // llamado axios
  e.preventDefault();
};

const handleInput = ({ target }) => {
  const { name, value } = target;
  // validateFields(name, value);
};

const Register = () => {
  //const email = useInput("email");
  const password = useInput("password");
  const firstName = useInput("firstName");
  const lastName = useInput("lastName");
  const username = useInput("username");

  return (
    <Container component="main" maxWidth="xs">
      <div>
        Registro
        <form onSubmit={onRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                label="First Name"
                onChange={firstName.onChange}
                value={firstName.value}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={lastName.onChange}
                value={lastName.value}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="street"
                required
                label="Calle"
                onChange={firstName.onChange}
                value={firstName.value}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Altura"
                name="province"
                onChange={lastName.onChange}
                value={lastName.value}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                label="username"
                name="username"
                onChange={username.onChange}
                value={username.value}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={password.onChange}
                value={password.value}
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
