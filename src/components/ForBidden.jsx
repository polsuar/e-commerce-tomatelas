import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  otherMargin: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
  },

  mainContainer: {
    width: "100vw",
    heigth: "100vh",
    display: "flex",
    marginTop: theme.spacing(1),
  },

  imagenContainer: {
    width: "50%",
    heigth: "100%",
    alignContent: "center",
    // marginLeft: theme.spacing(5),
  },
}));

const ForBiden = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container className={classes.otherMargin}>
      <Grid className={classes.mainContainer}>
        <Grid className={classes.imagenContainer}>
          <img
            src="https://ae01.alicdn.com/kf/He85d15c2432d4de1b65f9255a757e329N/Do-Not-Enter-Danger-Warning-Tin-SignsStop-Halt-Allowed-Attention-Forbidden-Caution-or-Admittance-Signs-Vintage.jpg"
            alt="do not enter"
            style={{
              width: "100%",
              heigth: "100%",
              marginLeft: theme.spacing(20),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForBiden;
