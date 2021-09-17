import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { addToLocalCart } from "../store/cart";
import { addFavorite } from "../store/favorites";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Products() {
  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [state, setState] = useState({ open: false });
  const [messageInfo, setMessageInfo] = useState(undefined);

  React.useEffect(() => {
    setState({ open: true });
  }, [messageInfo]);

  const handleClose = () => {
    setState({ open: false });
    setMessageInfo("");
    return;
  };

  const handleClick = (product) => {
    dispatch(addToLocalCart({ product, user }));
  };

  const addFav = (productId) => {
    if (!user.id) {
      setMessageInfo(
        "Debes estar logueado! \nPor favor, accede a tu cuenta..."
      );
    }
    dispatch(addFavorite({ userId: user.id, productId: productId }));
  };

  return (
    <Grid item xs={12} md={10}>
      {messageInfo ? (
        <Snackbar
          open={state.open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className={classes.snackbar}
        >
          <Alert severity="error" onClose={handleClose}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
              }}
            >
              {messageInfo}
            </div>
          </Alert>
        </Snackbar>
      ) : null}

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Link href={`/products/${product.id}`}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.img}
                    title="Image title"
                  />
                </Link>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>{`$${product.price}`}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    color="primary"
                    onClick={() => handleClick(product)}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <FavoriteIcon onClick={() => addFav(product.id)} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}
