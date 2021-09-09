import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Container from "@material-ui/core/Container";

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
}));

const SingleProductView = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="sm">
        <div class="visible-md">
          <nav class="breadcrumbs" role="navigation" aria-label="breadcrumbs">
            <ol>
              <li>
                <a href="/" title="Home">
                  Home
                </a>
              </li>

              <li>
                <a href="/collections/andes-origen" aria-current="page">
                  Andes Origen
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
              <figure class="product__image">
                <img
                  src="//cdn.shopify.com/s/files/1/0254/2947/5433/products/cerveza-andes-origen-rubia-473-siempreencasa_600x600.png?v=1629814628?nocache=0.22618285681204275"
                  alt="Cerveza Andes Origen Rubia Lata 473ml"
                />
              </figure>
            </Grid>

            <Grid item xs={6} justifyContent="flex-end">
              <div class="product-item__variants-box newCard__right">
                <h3>Cerveza Andes Origen Rubia </h3>

                <span class="milliliters">473ml</span>

                <p class="price__byUnit">
                  <span class="unityPriceNew">$74,00 c/u</span>
                </p>
                <hgroup>
                  <p
                    class="price__price newCard-price__right price__28698065993833"
                    data-price="44400"
                  >
                    $888
                  </p>

                  <span
                    class="listPrice listPrice__28698065993833"
                    data-listprice="63000"
                  >
                    $1260
                  </span>
                  <span class="discount">30% OFF</span>
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
