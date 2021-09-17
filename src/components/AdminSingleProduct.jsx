import React from "react";
import { useState, useEffect } from "react";
import { getSelectedProduct } from "../store/selectedProduct";
import { useInput } from "../hooks/useInput";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../store/products";
import {useHistory} from "react-router-dom";

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

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
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

const AdminSingleProduct = ({ id }) => {
  let history = useHistory();
  const product = useSelector((state) => state.selectedProduct);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({});
  const classes = useStyles();

  useEffect(() => {
    dispatch(getSelectedProduct(id))
    .then((res)=>
    
      setEdit({
        name: res.payload.name,
        volume: res.payload.volume,
        brand: res.payload.brand,
        stock: res.payload.stock,
        img: res.payload.img,
        price: res.payload.price,
        category: res.payload.category,
    })
  )
}, [])
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEdit((edit) => ({ ...edit, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data={
      name: edit.name,
      volume: edit.volume,
      brand: edit.brand,
      stock: edit.stock,
      img: edit.img,
      price: edit.price,
      category: edit.category,
    }
    dispatch(editProduct(product.id)
    );
    history.push("/admin")
  };


  return (
    <div>
      <Box>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Producto
            </Typography>
          </Box>
          <form onSubmit={handleSubmit} >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={edit.name}
                  onChange={handleChange}
                  id="name"
                  label="Nombre"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={edit.volume}
                  onChange={handleChange}
                  id="volume"
                  label="Volumen"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={edit.brand}
                  onChange={handleChange}
                  id="brand"
                  label="Marca"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={edit.stock}
                  onChange={handleChange}
                  id="stock"
                  label="Stock"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={edit.img}
                  onChange={handleChange}
                  id="img"
                  label="Imagen url"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={edit.price}
                  onChange={handleChange}
                  id="price"
                  label="Precio"
                  fullWidth
                />
              </Grid>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Categoría :
                </Typography>
              </Box>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
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
      <Container>
      <Grid className={classes.mainContainer}>
            <Grid className={classes.imagenContainer}>
              <img
                src={edit.img}
                alt={edit.name}
                style={{
                  width: "80%",
                  heigth: "100%",
                  // marginLeft: theme.spacing(20),
                }}
              />
            </Grid>
      </Grid>
      </Container>
    </div>
  );
};

export default AdminSingleProduct;
