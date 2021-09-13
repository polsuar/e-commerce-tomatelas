import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Link } from "@material-ui/core";
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
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections } = props;
  //const [sections, setSections] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/category").then((response) => {
  //     return setSections(response.data);
  //   });
  //   console.log(response.data);
  // }, []);

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
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
};
