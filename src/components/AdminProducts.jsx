import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { removeProduct } from "../store/products";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedProduct } from "../store/selectedProduct";
import { getAllProducts } from "../store/products";
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
  IconButton,
  TableHead,
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

const AdminProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const classes = useStyles();

  const handleClick = (id) => {
    dispatch(getSelectedProduct(id));
  };

  const handleDelete = (productId) => {
    console.log(productId);
    dispatch(removeProduct(productId));
  };

  return (
    <>
      <Link to={`/create/products/`}>
        <Button variant="contained" color="primary" size="large">
          Agregar Producto
        </Button>
      </Link>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Descripción</TableCell>
            <TableCell align="center">Volumen</TableCell>
            <TableCell align="center">Marca</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right"></TableCell>
          </TableRow>
          {products?.map((product) => (
            <>
              <TableRow key={product.id}>
                <TableCell>
                  <Link
                    onClick={() => handleClick(product.id)}
                    to={`/edit/products/${product.id}`}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={product.img}
                      className={classes.large}
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  <TableCell align="right">{`${product.name}`}</TableCell>
                </TableCell>
                <TableCell align="center">{`${product.volume}`}</TableCell>
                <TableCell align="center">{`${product.brand}`}</TableCell>
                <TableCell align="center">{`${product.stock}`}</TableCell>
                <TableCell align="center">{`$${product.price}`}</TableCell>
                <TableCell align="center">
                  <IconButton edge="end" color="inherit">
                    <DeleteIcon onClick={() => handleDelete(product.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminProducts;
