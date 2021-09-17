import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  promoteAdmin,
  revokeAdmin,
  removeUser,
} from "../store/userlist";
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
  IconButton,
  TableHead,
} from "@material-ui/core";
// icons
import { Grade, GradeOutlined, Delete } from "@material-ui/icons";

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

const AdminUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // trae lo del estado
  const users = useSelector((state) => state.userlist);

  const handlePromote = (userId) => {
    dispatch(promoteAdmin(userId));
  };

  const handleRevoke = (userId) => {
    dispatch(revokeAdmin(userId));
  };

  const handleDelete = (userId) => {
    dispatch(removeUser(userId));
  };

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Admin</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <>
              <TableRow key={user.id}>
                <TableCell>
                  {<Typography component="text">{user.userName}</Typography>}
                </TableCell>
                <TableCell align="center">{`${user.email}`}</TableCell>
                <TableCell align="center">{`${user.firstName}`}</TableCell>
                <TableCell align="center">{`${user.lastName}`}</TableCell>
                {user.isAdmin ? (
                  <TableCell align="center">
                    <IconButton color="inherit">
                      <Grade onClick={() => handleRevoke(user.id)} />
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    <IconButton color="inherit">
                      <GradeOutlined onClick={() => handlePromote(user.id)} />
                    </IconButton>
                  </TableCell>
                )}

                <TableCell align="center">
                  <IconButton edge="end" color="inherit">
                    <Delete onClick={() => handleDelete(user.id)} />
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

export default AdminUsers;
