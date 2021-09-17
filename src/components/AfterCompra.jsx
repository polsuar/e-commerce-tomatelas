import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../store/orders";
import emailjs from "emailjs-com";
import { makeStyles } from "@material-ui/core/styles";
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

export default function AfterCompra() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [envio, setEnvio] = useState(0);
  const [date, setDate] = useState("");
  const history = useHistory();

  const reducer = (acum, current) => acum + current.price * current.quantity;
  let total = cart ? cart.reduce(reducer, 0) : 0;

  useEffect(() => {
    if (cart.length < 5) {
      setEnvio(360);
    } else if (cart.length < 8) {
      setEnvio(580);
    } else {
      setEnvio(810);
    }
    const date = new Date();
    setDate(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
  }, []);

  const sendEmail = (data) => {
    emailjs
      .send(
        "service_nwzoqrw",
        "template_mrqbsy5",
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

  const handleClick = () => {
    let precioFinal = total + envio;
    dispatch(setOrder({ date, user, cart, precioFinal })).then((res) => {
      const message = {
        bodyMessage:
          "Gracias por tu compra, esperamos que disfrutes de tu pedido. Recorda que si tomás, no manejés y asi nos cuidarnos entre todos!",
        subjectMessage: "Compra realizada!",
        userName: user.userName,
        email: user.email,
        order: res.payload,
      };
    });
  };

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
                    Fecha: {date}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Products {`(${cart.length})`}
                  </Typography>
                  <Typography variant="h6" paragraph>
                    Total: ${total}
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
          onClick={handleClick}
        >
          Confirmar compra
        </Button>
      </Container>
    </React.Fragment>
  );
}
