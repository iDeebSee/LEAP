import React, { useEffect, useState } from 'react';
import ResourcesService from '../services/ResourcesService';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table
    , TableBody
    , TableCell
    , TableContainer
    , TableHead
    , TableRow
    , Paper
    , Grid
    , Container
    , MenuItem
    , Dialog
    , DialogTitle
    , DialogContent
    , DialogContentText
    , DialogActions, ButtonGroup, Button, TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function Resources() {

    const [resources, setResources] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [resourceID, setResourceID] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        body: {
            fontSize: 14,
        },


    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);


    const useStyles = makeStyles({
        table: {
            minWidth: 700,

        },
        dialog: {
            minHeight: '500px',
        }
    });

    const classes = useStyles();


    const getAllResources = () => {
        ResourcesService.getAll().then(res => {
            console.log(res.data);
            setResources(res.data);

        });
    }



    const openDeleteDialog = (id) => {
        setOpenDelete(true);
        setResourceID(id);
        console.log(id);
    }

    const openCreateDialog = () => {
        setOpenCreate(true);
    }

    const openEditDialog = (id, _name, _description) => {
        setResourceID(id)
        setName(_name);
        setDescription(_description);
        setOpenEdit(true);
    }

    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    const closeCreateDialog = () => {
        setOpenCreate(false);
    }

    const closeEditDialog = () => {
        setOpenEdit(false);
    }

    const deleteResource = () => {
        console.log(resourceID);
        ResourcesService.delete(resourceID).then(() => {
            getAllResources();
        })
        closeDeleteDialog();
    }

    const createResource = () => {
        const data = { name, description }
        console.log(data);
        ResourcesService.create(data).then(() => {
            getAllResources();
        })
        closeCreateDialog();
    }

    const editResource = () => {
        let data = {"name": name, "description": description};
        ResourcesService.update(resourceID, data).then(() => {
            getAllResources();
            closeEditDialog();
        });
        
    }

    const deleteDialog = (
        <Dialog open={openDelete} onClose={() => { closeDeleteDialog() }} className={useStyles.dialog} style={{ overflow: 'unset', }}>
            <DialogTitle>Are you sure you want to delete this application?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action cannot be reversed!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => deleteResource()}>Delete</Button>
                    <Button variant="text" color="primary" onClick={() => { closeDeleteDialog() }}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );


    const createDialog = (
        <Dialog open={openCreate} onClose={() => { closeCreateDialog() }} className={useStyles.dialog}>
            <DialogTitle>Add resource</DialogTitle>

            <DialogContentText >
                <DialogContent style={{ overflowY: 'unset', }}>
                    <Grid container spacing={3}>
                        <TextField style={{ padding: '10px', width: '80%', margin: 'auto', }} id="standard-basic" label="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField style={{ padding: '10px', width: '80%', margin: 'auto', }} multiline label="description" type="text" value={description} rows={4} onChange={(e) => setDescription(e.target.value)} />
                    </Grid>
                </DialogContent>
            </DialogContentText>

            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => createResource()}>Create</Button>
                    <Button variant="text" color="primary" onClick={() => { closeCreateDialog() }}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    )

    const editDialog = (
        <Dialog open={openEdit} onClose={() => { closeEditDialog() }} className={useStyles.dialog} style={{ overflow: 'unset', }}>
            <DialogTitle>Update resource</DialogTitle>
            <DialogContentText >
                <DialogContent style={{ overflowY: 'unset', }}>
                    <Grid container spacing={3}>
                        <TextField style={{ padding: '10px', width: '80%', margin: 'auto', }} id="standard-basic" label="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField style={{ padding: '10px', width: '80%', margin: 'auto', }} multiline label="description" type="text" value={description} rows={4} onChange={(e) => setDescription(e.target.value)} />
                    </Grid>
                </DialogContent>
            </DialogContentText>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => editResource()}>Update</Button>
                    <Button variant="text" color="primary" onClick={() => { closeEditDialog() }}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );

    useEffect(() => {
        getAllResources();
    }, []);



    return (
        <Container maxWidth="lg" className={classes.container} style={{ width: '80%', maxWidth: 'none', }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper >
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align="left">Description</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {resources.map((resource) => (
                                        <StyledTableRow key={resource.name}>

                                            <StyledTableCell component="th" scope="row">
                                                {resource.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{resource.description}</StyledTableCell>
                                            <StyledTableCell style={{ width: '10px', }} align="left"><MenuItem onClick={() => openDeleteDialog(resource.id)}><DeleteIcon></DeleteIcon></MenuItem></StyledTableCell>
                                            <StyledTableCell style={{ width: '10px', }} align="left"><MenuItem onClick={() => openEditDialog(resource.id, resource.name, resource.description)}><EditIcon></EditIcon></MenuItem></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Button onClick={() => openCreateDialog()}>Add</Button>
                </Grid>
            </Grid>
            {deleteDialog}
            {createDialog}
            {editDialog}
        </Container>
    );
}