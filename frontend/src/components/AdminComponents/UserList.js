import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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
  const classes = useStyles(),
  [id, setId] = useState(''),
  [open, setOpen] = useState(false);

  const DeleteDialog = () => {
    return(
      <Dialog open={open} onClose={() => closeDeleteDialog()}>
        <DialogTitle>Are you sure you wish to delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button variant="text" color="primary" onClick={() => deleteUser()}>Delete</Button>
            <Button variant="text" color="primary" onClick={() => closeDeleteDialog()}>Cancel</Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    );
  }
  /**
   * dit dient om het deletedialog te openen 
   */
  const openDeleteDialog = (id) => {
    setId(id);
    setOpen(true);
  }
/**
   * dit dient om het deletedialog te sluiten 
   */
  const closeDeleteDialog = () => {
    setOpen(false);
  }
  /**
   * dit dient om een gebruiker te verwijderen
   */
  const deleteUser = () => {
    onDelete(id);
    closeDeleteDialog();
  }

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
                    <Button onClick={() => openDeleteDialog(user.id)}>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </StyledTableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog/>
    </Paper>
  );
}
