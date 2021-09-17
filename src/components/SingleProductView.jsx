import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSelectedProduct,
  setQuantityProduct,
} from "../store/selectedProduct";
import { addToLocalCart } from "../store/cart";
import { addFavorite } from "../store/favorites";
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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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
    // marginLeft: theme.spacing(5),
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

  //Funcionalidad para el FORMCONTROL
  const [quantity, setQuantity] = useState(6);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    let ev = event.target.value;
    dispatch(setQuantityProduct({ ev, product }));
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

  //Funcionalidad para el BREADCRUMB
  const handleClick = (event) => {
    event.preventDefault();
    history.push("/");
  };

  //Alert en FAVS si NO HAY USUARIO
  const [favsAny, setFavsAny] = useState(false);
  const handleOpenFavsAny = () => {
    setFavsAny(true);
  };
  const handleCloseFavsAny = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFavsAny(false);
  };

  //Alert a carrito
  const [carrito, setCarrito] = useState(false);
  const handleOpenCarrito = () => {
    setCarrito(true);
  };
  const handleCloseCarrito = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCarrito(false);
  };

  //Alert a favs
  const [favs, setFavs] = useState(false);
  const handleOpenFavs = () => {
    setFavs(true);
  };
  const handleCloseFavs = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFavs(false);
  };

  //Funcionalidad para AGREGAR AL CARRITO
  const addCar = (product) => {
    dispatch(addToLocalCart(product));
    handleOpenCarrito();
  };

  //Funcionalidad para AGREGAR A FAVORITOS
  const addFav = (productId) => {
    if (!user.id) {
      handleOpenFavsAny();
    } else {
      dispatch(addFavorite({ userId: user.id, productId: productId }));
      handleOpenFavs();
    }
  };

  return (
    <div>
      <Paper className={classes.otherMargin} elevation={3}>
        <Container>
          <Grid>
            <a href="javascript:history.back()">&lt; Volver atras</a>
          </Grid>
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
                    <Snackbar
                      open={carrito}
                      autoHideDuration={1500}
                      onClose={handleCloseCarrito}
                    >
                      <Alert severity="success" color="info">
                        Se agregó al Carrito!
                      </Alert>
                    </Snackbar>
                  </IconButton>
                  <IconButton color="primary">
                    <Snackbar
                      open={favsAny}
                      autoHideDuration={3000}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      className={classes.snackbar}
                      onClose={handleCloseFavsAny}
                    >
                      <Alert severity="error">
                        <div
                          style={{
                            display: "flex",
                            flexFlow: "column",
                            alignItems: "center",
                          }}
                        >
                          Debes estar logueado! Por favor, accede a tu cuenta...
                        </div>
                      </Alert>
                    </Snackbar>
                    <FavoriteIcon onClick={() => addFav(product.id)} />
                    <Snackbar
                      open={favs}
                      autoHideDuration={1500}
                      onClose={handleCloseFavs}
                    >
                      <Alert severity="success" color="info">
                        Se agregó a Favoritos!
                      </Alert>
                    </Snackbar>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};
export default SingleProductView;
