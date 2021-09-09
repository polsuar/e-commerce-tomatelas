import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  IconButton,
  Container,
  Paper,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
//import { grey } from "@material-ui/core/colors";
import data from "../assets/data";

//const accent = grey["900"];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    margin: {
      margin: theme.spacing(1),
    },

    justifyContent: "center",
  },

  // accent: grey["900"],

  grey: {
    /*   padding: theme.spacing(2),
    textAlign: "center", */
    color: theme.palette.text.secondary,
    //textAlign: "center",
  },

  paperLeft: {
    flex: 1,
    height: "100%",
    margin: 10,
    textAlign: "center",
    padding: 10,
  },

  paperRight: {
    height: "100%",
    flex: 4,
    margin: 30,
    paddingTop: "8rem",
    // alignItems: "center",
    // display: "flex",
    //justifyContent: "center",
    //flexDirection: "column",
    // textAlign: "center",
    //color: theme.palette.text.secondary,
  },

  paperContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const SingleProductView = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [contador, setContador] = useState(1);
  const [carrito, setCarrito] = useState([]);

  const fetchProduct = () => {
    //  const res = await fetch(data);
    const map = data.map((x) => x);
    console.log(map, "-----data");
  };

  //useEffect();

  const handleQuantity = (param) => {
    if (param === "decrement" && contador > 1) {
      setContador(contador - 1);
      console.log(contador, "-----ENTRA AL CONTADOR");
    }
    if (param === "increment" && contador < 1000) {
      setContador(contador + 1);
      console.log(contador, "++++ENTRA AL CONTADOR");
    }
  };

  return (
    <div className={classes.root}>
      <div>{fetchProduct}</div>
      <Paper>
        <Container>
          <a href="javascript:history.back()">&lt; Volver atras</a>

          <Grid container className={classes.paperContainer}>
            <Grid item xs={12} md={8} className={classes.paperLeft}>
              <figure>
                <img
                  /*  src="//cdn.shopify.com/s/files/1/0254/2947/5433/products/cerveza-andes-origen-rubia-473-siempreencasa_95x95@2x.png?v=1629814628?nocache=0.7664677045500179" */
                  src="//cdn.shopify.com/s/files/1/0254/2947/5433/products/cerveza-andes-origen-rubia-473-siempreencasa_600x600.png?v=1629814628?nocache=0.22618285681204275"
                  alt="Cerveza Andes Origen Rubia Lata 473ml"
                  /*  src={product.imagen}
                  alt={product.name} */
                />
              </figure>
            </Grid>
            {/*  <Divider orientation="vertical" flexItem /> */}

            <Grid item xs={12} md={8} className={classes.paperRight}>
              <Typography variant="h2" fontWeight="fontWeightBold" m={1}>
                Cerveza Andes Origen Rubia {product.name}
              </Typography>
              <Grid item xs={6} className={classes.grey}>
                <Typography variant="h5">
                  473ml
                  {product.mililitros}
                </Typography>
              </Grid>
              <Typography color="primary" variant="h4">
                $74,00 c/u {product.price}
              </Typography>
              <Grid container spacing={2} className={classes.grey}>
                <Grid item xs={6}>
                  <Typography variant="h5">Elegí la cantidad:</Typography>
                </Grid>
                <Grid container item xs={6} textAlign="center">
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      className={classes.margin}
                      onClick={() => {
                        handleQuantity("decrement");
                      }}
                    >
                      -
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5">{contador}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      className={classes.margin}
                      onClick={() => {
                        handleQuantity("increment");
                      }}
                    >
                      +
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>{" "}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};
export default SingleProductView;
