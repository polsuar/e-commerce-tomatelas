import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { removeUser } from "../store/userlist";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
// icons

import DeleteIcon from "@material-ui/icons/Delete";
import { RemoveCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  cartFooter: {
    padding: theme.spacing(4),
  },
  stock: {
    color: "#afafaf",
  },
}));

const AdminProducts = () => {
  const classes = useStyles();

  //ejecuta
  const dispatch = useDispatch();

  // trae lo del estado
  const users = useSelector((state) => state.userlist);

  const handleChange = () => {};

  const handleDelete = (userId) => {
    dispatch(removeUser({ userId }));
  };


  return (
    <>
      <Table size="small">
        <TableBody>
          {users?.map((user) => (
            <>
              <TableRow key={user.id}>
                <TableCell>
                  {<Typography component="text">{user.userName}</Typography>}
                </TableCell>
                <TableCell align="right">{`${user.email}`}</TableCell>
                <TableCell align="right">{`${user.firstName}`}</TableCell>
                <TableCell align="right">{`${user.lastName}`}</TableCell>
                <TableCell align="right">{`${user.street}`}</TableCell>
                <TableCell align="right">{`${user.province}`}</TableCell>
                <TableCell align="right">{`${user.city}`}</TableCell>
                <TableCell align="right">{`${user.phone}`}</TableCell>

                <TableCell align="right">
                  <IconButton edge="end" color="inherit">
                    <DeleteIcon onClick={() => handleDelete(user.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminProducts;