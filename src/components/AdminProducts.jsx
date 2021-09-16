import React from "react";
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

export default function Album() {
  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const handleClick = (product) => {
  //   dispatch(addToLocalCart(product));
  // };

  // const addFav = (productId) => {
  //   dispatch(addFavorite({ userId: user.id, productId: productId }));
  // };

  return (
    
                <div  className="App">
          {products?.map((product) => (
            <>
            <div>{product.name}</div> 
            </>
            
              ))}
              </div>
  );
}
