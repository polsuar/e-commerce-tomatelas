import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
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

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(22),
  },
  card: {
    marginTop: theme.spacing(6),
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  btn: {
    marginTop: theme.spacing(6),
  },
}));

const rows = [
  {
    date: "asd22",
    name: "hola",
    shipTo: "123asd",
    amount: 12234,
  },
  {
    date: "asd22",
    name: "hola",
    shipTo: "123asd",
    paymentMethod: "nada",
    amount: 12234,
  },
  {
    date: "asd22",
    name: "hola",
    shipTo: "123asd",
    paymentMethod: "nada",
    amount: 12234,
  },
  {
    date: "asd22",
    name: "hola",
    shipTo: "123asd",
    paymentMethod: "nada",
    amount: 12234,
  },
];

const featuredPosts = [
  {
    id: 234,
    products: "Products (4)",
    date: "15 marzo, 2021",
    total: 5600,
  },
  {
    firstName: "Luca",
    lastName: "Bogari",
    street: "Tucuman 516",
    province: "Rio Negro",
    city: "Cipolletti",
    zipcode: 8324,
    phone: "2994694619",
    price: 360,
  },
];

export default function AfterCompra() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Typography component="h2" variant="h6" color="primary">
          Productos
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    <ShoppingBasketIcon color="primary" /> Resumen de compra
                  </Typography>
                  <Typography component="subtitle1">
                    # {featuredPosts[0].id}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Fecha: {featuredPosts[0].date}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {featuredPosts[0].products}
                  </Typography>
                  <Typography variant="h6" paragraph>
                    Total: ${featuredPosts[0].total}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    <RoomIcon color="primary" /> Envio
                  </Typography>
                  <Typography component="subtitle1">
                    {featuredPosts[1].street}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {featuredPosts[1].province}, {featuredPosts[1].city}{" "}
                    {featuredPosts[1].zipcode}
                  </Typography>
                  <Typography variant="subtitle" paragraph>
                    {featuredPosts[1].firstName} {featuredPosts[1].lastName} -{" "}
                    {featuredPosts[1].phone}
                  </Typography>
                  <Typography variant="h6" paragraph>
                    Envio: ${featuredPosts[1].price}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
        </Grid>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          size="large"
        >
          Confirmar compra
        </Button>
      </Container>
    </React.Fragment>
  );
}
