import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedProduct } from "../store/selectedProduct";
import {
  Grid,
  IconButton,
  Container,
  Paper,
  Typography,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
//import { grey } from "@material-ui/core/colors";
//import data from "../assets/data";

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
    margin: theme.spacing(1),
    //textAlign: "center",
  },
  margin: {
    marginTop: theme.spacing(2),
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
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SingleProductView = ({ id }) => {
  const product = useSelector((state) => state.selectedProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedProduct(id));
  }, []);

  const classes = useStyles();

  const [cantidad, setCantidad] = useState("");
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setCantidad(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  /* const [contador, setContador] = useState(1);
  const handleQuantity = (param) => {
    if (param === "decrement" && contador > 1) {
      setContador(contador - 1);
      console.log(contador, "-----ENTRA AL CONTADOR");
    }
    if (param === "increment" && contador < 1000) {
      setContador(contador + 1);
      console.log(contador, "++++ENTRA AL CONTADOR");
    }
  }; */

  return (
    <div className={classes.root}>
      <Paper>
        <Container>
          <a href="javascript:history.back()">&lt; Volver atras</a>

          <Grid container className={classes.paperContainer}>
            <Grid item xs={12} md={8} className={classes.paperLeft}>
              <figure>
                <img src={product.img} alt={product.name} />
              </figure>
            </Grid>
            <Grid item xs={12} md={8} className={classes.paperRight}>
              <Typography variant="h2" fontWeight="fontWeightBold" m={1}>
                {product.name}
              </Typography>
              <Typography variant="p" className={classes.grey}>
                {product.volume}
              </Typography>
              {/* <Grid item xs={6} className={classes.grey}>
                <Typography variant="h5">{product.volume}</Typography>
              </Grid> */}
              <Grid className={classes.margin}>
                <Typography color="primary" variant="h4">
                  {`$${product.price * 6}`}
                </Typography>
                <Typography color="primary" variant="p">
                  {" "}
                  6 unidades{" "}
                </Typography>
                <Typography className={classes.grey} variant="p">
                  {`$${product.price} por 1 unidad`}
                </Typography>
              </Grid>
              <Grid container spacing={2} className={classes.grey}>
                <Grid item xs={6}>
                  <Typography variant="h5">Elegí la cantidad:</Typography>
                </Grid>
                <Grid container item xs={6} textAlign="center">
                  {/* <Button className={classes.button} onClick={handleOpen}>
                    Open the select
                  </Button> */}
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">
                      Unidades
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={cantidad}
                      onChange={handleChange}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={6}>6 unidades</MenuItem>
                      <MenuItem value={12}>12 unidades</MenuItem>
                      <MenuItem value={18}>18 unidades</MenuItem>
                      <MenuItem value={24}>24 unidades</MenuItem>
                    </Select>
                  </FormControl>
                  {/*  <Grid item xs={3}>
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
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                // className={classes.grey}
                justifyContent="center"
              >
                <IconButton color="primary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};
export default SingleProductView;
