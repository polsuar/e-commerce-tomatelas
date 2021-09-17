import React from "react";
import { useState, useEffect } from "react";
import { getSelectedProduct } from "../store/selectedProduct";
import {useInput} from "../hooks/useInput"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {editProduct} from "../store/products"
import {
  Button,
  TextField,
  Container,
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: "90vw",
    heigth: "100vh",
    display: "flex",
    // marginTop: theme.spacing(1),
    //justifyContent: "space-evenly",
    // background: "aqua",
  },
  imagenContainer: {
    width: "50%",
    heigth: "100%",
    //marginTop: theme.spacing(5),
    // marginLeft: theme.spacing(5),
    // background: "red",
  },
  textoContainer: {
    width: "50%",
    heigth: "100%",
    // marginTop: theme.spacing(5),
    // marginRight: theme.spacing(10),
    // background: "#CCFAE1",
  },
}));


const AdminSingleProduct = ({id}) => {
  const product = useSelector((state) => state.selectedProduct);
  const dispatch = useDispatch();
  const [value, setValue]= useState({})

  const classes = useStyles();
  useEffect(() => {
    dispatch(getSelectedProduct(id))
  
  }, []);
  
  const name = useInput('name');
  const volume = useInput('volume');
  const brand = useInput('brand');
  const stock = useInput('stock');
  const img = useInput('img');
  const price = useInput('price');
  const category = useInput('category'); 

const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editProduct({
            name: name.value,
            volume: volume.value,
            brand: brand.value,
            stock: stock.value,
            img: img.value,
            price: price.value,
            category: category.value
        }))
}
  return (
    <div>
      <Box>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Producto
            </Typography>
          </Box>
          <form   noValidate>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...name}
                  value={product.name}
                  required
                  id="name"
                  label="Nombre"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...volume} value={product.volume} required id="volume" label="Volumen" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...brand} value={product.brand} required id="brand" label="Marca" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...stock} value={product.stock} required id="stock" label="Stock" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...img} value={product.img} required id="img" label="Imagen url" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...price} value={product.price} required id="price" label="Precio" fullWidth />
              </Grid>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Categoría :
                </Typography>
              </Box>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                {...category}
              >
                <MenuItem value={"Cervezas"}>Cervezas</MenuItem>
                <MenuItem value={"Gaseosas"}>Gaseosas</MenuItem>
                <MenuItem value={"Aguas"}>Aguas</MenuItem>
                <MenuItem value={"Aguas Saborizadas"}>
                  Aguas Saborizadas
                </MenuItem>
                <MenuItem value={"Bebidas Energizantes"}>
                  Bebidas Energizantes
                </MenuItem>
                <MenuItem value={"Bebidas Isotónicas"}>
                  Bebidas Isotónicas
                </MenuItem>
                <MenuItem value={"Vinos"}>Vinos</MenuItem>
                <MenuItem value={"Leches"}>Leches</MenuItem>
              </Select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Confirmar
              </Button>
            </Grid>
          </form>
        </Grid>
      </Box>
      {/* <Container>
      <Grid className={classes.mainContainer}>
            <Grid className={classes.imagenContainer}>
              <img
                src={product.img}
                alt={product.name}
                style={{
                  width: "80%",
                  heigth: "100%",
                  // marginLeft: theme.spacing(20),
                }}
              />
            </Grid>
      </Grid>
      </Container> */}
    </div>
  );
};

export default AdminSingleProduct;
