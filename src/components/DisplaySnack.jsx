import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const DisplaySnack = ({ msg, open, handleCloseError, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseError}>
      <Alert onClose={handleCloseError} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default DisplaySnack;
