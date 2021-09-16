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
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [envio, setEnvio] = useState(0);

  useEffect(() => {
    if (cart.length < 5) {
      setEnvio(360);
    } else if (cart.length < 8) {
      setEnvio(580);
    } else {
      setEnvio(810);
    }
  }, []);

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
            {cart.map((product) => (
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    <ShoppingBasketIcon color="primary" /> Resumen de compra
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Fecha: {featuredPosts[0].date}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Products {`(${cart.length})`}
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
                  <Typography component="subtitle1">{user.street}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {user.province}, {user.city} {user.zipcode}
                  </Typography>
                  <Typography variant="subtitle" paragraph>
                    {user.firstName} {user.lastName} - {user.phone}
                  </Typography>
                  <Typography variant="h6" paragraph>
                    Envio: ${envio}
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
