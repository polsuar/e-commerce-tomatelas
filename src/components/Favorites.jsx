import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import React, { useState } from "react";
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
  const favorites = useSelector((state) => state.favorites);
  const handleChange = () => {};

  return (
    <>
      {/* <Container maxWidth="lg" className={classes.container}> */}

      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell align="right" colSpan={12}>
              <Button variant="contained" color="primary" size="small">
                <RemoveCircleOutline />
              </Button>
            </TableCell>
          </TableRow>

          {favorites?.map((product) => (
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
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </Container> */}
    </>
  );
};

export default Favorites;
