import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },

    justifyContent: "center",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperLeft: {
    flex: 1,
    height: "100%",
    margin: 10,
    textAlign: "center",
    padding: 10,
  },
  paperRight: {
    height: 600,
    flex: 4,
    margin: 10,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const SingleProductView = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="sm">
        {/* <div>
          <nav role="navigation">
            <ol>
              <li>
                <a href="/" title="Home">
                  Home &gt;
                </a>
              </li>

              <li>
                <a href="/collections/andes-origen"> Andes Origen &gt;</a>
              </li>
            </ol>
          </nav>
        </div> */}

        <a href="javascript:history.back()">&lt; Volver atras</a>

        <Paper className>
          <Grid container>
            <Grid item xs={6} className={classes.paperLeft}>
              <figure>
                {/* <img
                  src="//cdn.shopify.com/s/files/1/0254/2947/5433/products/cerveza-andes-origen-rubia-473-siempreencasa_600x600.png?v=1629814628?nocache=0.22618285681204275"
                  data-src=""
                  alt="Cerveza Andes Origen Rubia Lata 473ml"
                /> */}
                <img
                  src="//cdn.shopify.com/s/files/1/0254/2947/5433/products/cerveza-andes-origen-rubia-473-siempreencasa_95x95@2x.png?v=1629814628?nocache=0.7664677045500179"
                  alt="Cerveza Andes Origen Rubia Lata 473ml"
                />
              </figure>
            </Grid>
            {/*  <Divider orientation="vertical" flexItem /> */}

            <Grid item xs={6} className={classes.paperRight}>
              <div>
                <h1>Cerveza Andes Origen Rubia </h1>

                <span>473ml</span>

                <p>
                  <span>$74,00 c/u</span>
                </p>
                <hgroup>
                  <p data-price="44400">$888</p>

                  <span data-listprice="63000">$1260</span>
                  <span>30% OFF</span>
                </hgroup>
              </div>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>{" "}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};
export default SingleProductView;
