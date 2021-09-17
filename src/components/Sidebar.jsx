import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getProductsByBrand } from "../store/products";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  links: {
    cursor: "pointer",
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/brand").then((res) => {
      setBrands(res.data);
    });
    console.log("brands", brands);
  }, []);

  const handleClick = (brandName) => {
    dispatch(getProductsByBrand(brandName));
  };

  return (
    <Grid item xs={12} md={2}>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Filtrar/Marcas
      </Typography>
      {brands.map((brand) => (
        <Link
          color="inherit"
          className={classes.links}
          display="block"
          variant="body1"
          key={brand.brand}
          onClick={() => {
            handleClick(brand.brand);
          }}
        >
          {brand.brand}
        </Link>
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
};
