import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

const useStyles = makeStyles((theme) => ({
  paper: {
      padding: theme.spacing(2),
  },
  fixedHeight: {
      height: "42rem",
  },

}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[400],
    },
  },
}))(TableRow);

export default function UserList({users, setUser, onDelete}) {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.paper, classes.fixedHeight)}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Roles</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.map(user => {
            return(
              <StyledTableRow key={nanoid()}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.toString()}</TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button onClick={() => {setUser(user)}}>Edit</Button>
                    <Button onClick={() => onDelete(user.id)}>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </StyledTableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
