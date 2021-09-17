import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { removeProduct } from "../store/products";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { RemoveCircleOutline } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedProduct } from "../store/selectedProduct";
import { getAllOrders } from "../store/orders";
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

const axios = require("axios");
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

const AdminOrders = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`/api/orders`).then((res) => {
      return setOrders(res.data);
    });
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Numero de Orden</TableCell>
            <TableCell align="center">Id de Usuario</TableCell>
            <TableCell align="center">UserName</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Total Price</TableCell>
            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <>
              <TableRow key={order.order_id}>
                <TableCell>
                  <Link onClick={() => handleClick(order.order_id)} to={``}>
                    <TableCell align="center">{`${order.order_id}`}</TableCell>
                  </Link>
                </TableCell>
                {/* <TableCell>
                  {<Typography component="text">{order.user_id}</Typography>}
                </TableCell> */}
                <TableCell align="center">{`${order.user_id}`}</TableCell>
                <TableCell align="center">{`${order.userName}`}</TableCell>
                <TableCell align="center">{`${order.created}`}</TableCell>
                <TableCell align="center">{`${order.total_price}`}</TableCell>
                <TableCell align="center">{`${order.state}`}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminOrders;
