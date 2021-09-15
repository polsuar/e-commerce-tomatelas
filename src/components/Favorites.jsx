import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { removeFavorite, removeAllFavorites } from "../store/favorites";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
// icons

import DeleteIcon from "@material-ui/icons/Delete";
import { RemoveCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  cartFooter: {
    padding: theme.spacing(4),
  },
  stock: {
    color: "#afafaf",
  },
}));

const Favorites = () => {
  const classes = useStyles();

  //ejecuta
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  // trae lo del estado
  const user = useSelector((state) => state.user);

  const handleChange = () => {};

  const handleDelete = (productId) => {
    dispatch(removeFavorite({ userId: user.id, productId: productId }));
  };

  const handleDeleteAll = () => {
    dispatch(removeAllFavorites(user.id));
  };

  return (
    <>
      {/* <Container maxWidth="lg" className={classes.container}> */}

      <Table size="small">
        {favorites.length > 0 ? (
          <TableRow>
            <TableCell align="right" colSpan={12}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleDeleteAll(user.id)}
              >
                <RemoveCircleOutline />
              </Button>
            </TableCell>
          </TableRow>
        ) : null}

        <TableBody>
          {favorites.length === 0 ? (
            <TableRow>
              <TableCell align="right" colSpan={12} align="center">
                <h2>No tienes favoritos</h2>
              </TableCell>
            </TableRow>
          ) : null}

          {favorites?.map((product) => (
            <>
              <TableRow key={product.id}>
                <TableCell>
                  <Link href={`/products/${product.id}`}>
                    <Avatar
                      alt="Remy Sharp"
                      src={product.img}
                      className={classes.large}
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  {<Typography component="text">{product.name}</Typography>}
                </TableCell>

                <TableCell align="right">{`$${product.price}`}</TableCell>
                <TableCell align="right">
                  <IconButton edge="end" color="inherit">
                    <DeleteIcon onClick={() => handleDelete(product.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      {/* </Container> */}
    </>
  );
};

export default Favorites;
