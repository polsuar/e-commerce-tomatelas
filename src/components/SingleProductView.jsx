import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useHistory } from "react-router-dom";
=======
import { useHistory, Route, Link as RouterLink } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
>>>>>>> cecc2de0d7472307ed9bf1bc8ac7c46ac8c0786c
import { useSelector, useDispatch } from "react-redux";
import { getSelectedProduct } from "../store/selectedProduct";
import { addToLocalCart } from "../store/cart";
import { addFavorite } from "../store/favorites";
import { getProductsByBrand } from "../store/products";
import {
  Grid,
  IconButton,
  Container,
  Paper,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  grey: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(5),
    margin: theme.spacing(1),
  },

  margin: {
    marginTop: theme.spacing(5),
  },

  otherMargin: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
  },

  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  mainContainer: {
    width: "90vw",
    heigth: "100vh",
    display: "flex",
    marginTop: theme.spacing(1),
  },
  imagenContainer: {
    width: "50%",
    heigth: "100%",
    marginLeft: theme.spacing(5),
  },
  textoContainer: {
    width: "50%",
    heigth: "100%",
    marginRight: theme.spacing(10),
  },
}));

const SingleProductView = ({ id }) => {
  const product = useSelector((state) => state.selectedProduct);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSelectedProduct(id));
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

<<<<<<< HEAD
  //Funcionalidad para el FORMCONTROL
  const [quantity, setQuantity] = useState(6);
  const [open, setOpen] = useState(false);
=======
  const handleClick = (brandName) => {
    dispatch(getProductsByBrand(brandName));
    console.info("You clicked a breadcrumb.", brandName);
  };
>>>>>>> cecc2de0d7472307ed9bf1bc8ac7c46ac8c0786c

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handlePrice = () => {
    if (quantity === 6) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 6}`}</Box>
        </Typography>
      );
    }
    if (quantity === 12) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 12}`}</Box>
        </Typography>
      );
    }
    if (quantity === 18) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 18}`}</Box>
        </Typography>
      );
    }
    if (quantity === 24) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 24}`}</Box>
        </Typography>
      );
    }
  };
<<<<<<< HEAD

  //Funcionalidad para el BREADCRUMB
  const handleClick = (event) => {
    event.preventDefault();
    history.push("/");
    console.info("You clicked a breadcrumb.");
  };

  //Funcionalidad para AGREGAR AL CARRITO
  const addCar = (product) => {
    dispatch(addToLocalCart({ product, user }));
  };

  //Funcionalidad para AGREGAR A FAVORITOS
  const addFav = (productId) => {
    dispatch(addFavorite({ userId: user.id, productId: productId }));
  };

=======
>>>>>>> cecc2de0d7472307ed9bf1bc8ac7c46ac8c0786c
  return (
    <div>
      <Route>
        <Paper className={classes.otherMargin} elevation={3}>
          <Container>
            <Grid>
              <a href="javascript:history.back()">&lt; Volver atras</a>
            </Grid>
<<<<<<< HEAD
            <Grid className={classes.textoContainer}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" href="/home" onClick={handleClick}>
                  Home
                </Link>
                <Typography color="inherit">{product.brand}</Typography>
                <Typography color="inherit">{product.name}</Typography>
              </Breadcrumbs>

              <Typography variant="h2">
                <Box fontWeight="fontWeightMedium">{product.name}</Box>
              </Typography>
              <Typography variant="p" className={classes.grey}>
                {product.volume}
              </Typography>
=======
            <Grid className={classes.mainContainer}>
              <Grid className={classes.imagenContainer}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: "80%",
                    heigth: "100%",
                    marginLeft: theme.spacing(20),
                  }}
                />
              </Grid>
              <Grid className={classes.textoContainer}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Link color="inherit" to="/" onClick={() => handleClick()}>
                    Home
                  </Link>
                  <Link
                    color="inherit"
                    to="/"
                    //href="/getting-started/installation/"
                    onClick={() => handleClick(product.brand)}
                  >
                    {product.brand}
                  </Link>
                  <Typography color="inherit">{product.name}</Typography>
                </Breadcrumbs>
>>>>>>> cecc2de0d7472307ed9bf1bc8ac7c46ac8c0786c

                <Typography variant="h2">
                  <Box fontWeight="fontWeightMedium">{product.name}</Box>
                </Typography>
                <Typography variant="p" className={classes.grey}>
                  {product.volume}
                </Typography>

                <Grid className={classes.margin}>
                  {handlePrice()}
                  <Typography color="primary" variant="button">
                    {`${quantity} unidades`}
                  </Typography>
                  <Typography className={classes.grey} variant="button">
                    {`$${product.price} por 1 unidad`}
                  </Typography>
                </Grid>

                <Grid container className={classes.grey}>
                  <Grid item xs={6} spacing={5}>
                    <Typography variant="h5">Elegí la cantidad:</Typography>
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
                        value={quantity}
                        onChange={handleChange}
                      >
                        <MenuItem value={6}>6 unidades</MenuItem>
                        <MenuItem value={12}>12 unidades</MenuItem>
                        <MenuItem value={18}>18 unidades</MenuItem>
                        <MenuItem value={24}>24 unidades</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                      onClick={() => addCar(product)}
                    >
                      <AddShoppingCartIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="primary">
                      <FavoriteIcon onClick={() => addFav(product.id)} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Route>
    </div>
  );
};
export default SingleProductView;
