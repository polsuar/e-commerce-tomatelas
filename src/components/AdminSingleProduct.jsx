import React from 'react'
import { Button, TextField, Box, Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Este componente debería tener como valores default los valores del producto que se quiere editar (con un getProductById, o algo así)
// Debería renderizarse sólo para los ADMIN
const AdminSingleProduct = () => {
    
    return (
        <div>
        <Box >
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Producto
                    </Typography>
                </Box>
                <form noValidate>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="productName"
                                label="Nombre"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="volume"
                                label="Volumen"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="brand"
                                label="Marca"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="stock"
                                label="Stock"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="img"
                                label="Imagen url"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
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
                            <MenuItem value={'Cervezas'}>Cervezas</MenuItem>
                            <MenuItem value={'Gaseosas'}>Gaseosas</MenuItem>
                            <MenuItem value={'Aguas'}>Aguas</MenuItem>
                            <MenuItem value={'Aguas Saborizadas'}>Aguas Saborizadas</MenuItem>
                            <MenuItem value={'Bebidas Energizantes'}>Bebidas Energizantes</MenuItem>
                            <MenuItem value={'Bebidas Isotónicas'}>Bebidas Isotónicas</MenuItem>
                            <MenuItem value={'Vinos'}>Vinos</MenuItem>
                            <MenuItem value={'Leches'}>Leches</MenuItem>                            
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
        <Grid item xs={12} sm={6}>
        </Grid>
    </div>
    )
}

export default AdminSingleProduct