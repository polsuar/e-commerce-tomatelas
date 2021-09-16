import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Link } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getProductsByCategory } from "../store/products";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
    marginTop: theme.spacing(3),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    cursor: "pointer",
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      console.log(res.data);
      return setSections(res.data);
    });
  }, []);
  const handleClick = (categoryId) => {
    dispatch(getProductsByCategory(categoryId));
  };
  return (
    <React.Fragment>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.category_id}
            onClick={() => handleClick(section.category_id)}
            variant="body2"
            className={classes.toolbarLink}
          >
            {section.category_name}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
