import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../store/orders";
import emailjs from "emailjs-com";
import { makeStyles } from "@material-ui/core/styles";
import { getUserOrders } from "../store/orders";

import {
  Container,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import RoomIcon from "@material-ui/icons/Room";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 0,
  },
  card: {
    marginTop: 10,
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  btn: {
    marginTop: theme.spacing(6),
  },
}));

export default function AfterCompra() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [envio, setEnvio] = useState(0);
  const [date, setDate] = useState("");
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserOrders(user.id));
  }, []);

  const sendEmail = (data) => {
    emailjs
      .send(
        "service_nwzoqrw",
        "template_reczzzg",
        data,
        "user_XCxOcDMqNx5iPI6zMfMzI"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          {/* comienzo de map general */}
          {orders?.map((order) => (
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6}>
                        <Typography component="h2" variant="h5">
                          <ShoppingBasketIcon color="primary" />
                          id: {order.order_id}
                        </Typography>
                        <Typography color="textSecondary">
                          Estado: {order.state}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Fecha: {order.created}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" paragraph>
                          Total: $ {order.total_price}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Cantidad</TableCell>
                          <TableCell>Marca</TableCell>
                          <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.products?.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell align="right">{`$${
                              product.price * product.quantity
                            }`}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          ))}
          {/* fin de map general */}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
