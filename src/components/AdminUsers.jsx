import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {getAllUsers, promoteAdmin, revokeAdmin, removeUser} from "../store/userlist"
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
import { Grade, GradeOutlined, Delete} from "@material-ui/icons";

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
    dispatch(getAllUsers())
  }, []);


  // trae lo del estado
  const users = useSelector((state) => state.userlist);

  const handlePromote = (userId) => {
    dispatch(promoteAdmin( userId ));
  };

  const handleRevoke = (userId) => {
    console.log("REVOKE")
    dispatch(revokeAdmin( userId ));
  };

  const handleDelete = (userId) => {
    dispatch(removeUser( userId ));
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
                {user.isAdmin?(
                <TableCell align="right">
                <IconButton color="inherit">
                  <Grade onClick={() => handleRevoke(user.id)} />
                </IconButton>
              </TableCell>                  
                ):(
                <TableCell align="right">
                  <IconButton color="inherit">
                    <GradeOutlined onClick={() => handlePromote(user.id)} />
                  </IconButton>
                </TableCell>

                )}

                <TableCell align="right">
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