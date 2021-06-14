import { 
    Button, 
    ButtonGroup, 
    Dialog, 
    ListItem, 
    ListItemText,
    Paper,
    List,
    ListSubheader, 
    makeStyles,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import BussinesProcesService from "../services/BussinesProces.service";

const useStyles = (makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: "42rem",
    },
    dialog: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(2),
            width: '100%'
        }
    },
    listSubHeader: {
        backgroundColor: "lightgrey",
        margin: 0,
        width: "100%"
    }
})));

const BussinesProcesList = (props) => {
    const classes = useStyles(),
    BussinesProces = props.data,
    [openEdit, setOpenedit] = useState(false),
    [openDelete, setOpenDelete] = useState(false),
    [newName, setNewName] = useState(''),
    [currentBP, setCurrentBP] = useState(null),
    [newDesc, setNewDesc] = useState(''),
    [id, setId] = useState('');


    const openDeleteDialog = (id) => {
        setOpenDelete(true);
        setId(id);
    }

    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    const deleteBP = () => {
        props.onCardDelete(id);
        closeDeleteDialog();
        
    }
    const deleteDialog = (
        <Dialog open={openDelete} onClose={() => {closeDeleteDialog()}} className={classes.dialog}>
            <DialogTitle>Are you sure you want to delete this BussinesProces ?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action cannot be reversed! 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {deleteBP()}}>Delete</Button>
                    <Button variant="text" color="primary" onClick={() => {closeDeleteDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>);

    const editBussinesProces = () => {
        let data = {"name": newName, "description": newDesc};
       
        
        BussinesProcesService.update(id, data)
        .then(res => {
            console.log(res.data);
            props.getBussinesProcess();
            setOpenedit(false);
        })
        .catch(e => {
            console.log(e);
        });
    }
    const openEditDialog = (bussinesProces) => {
        setCurrentBP(bussinesProces);
        setId(bussinesProces.id);
        setNewName(bussinesProces.name);
        setNewDesc(bussinesProces.description);
        setOpenedit(true);
    };
    const closeEditDialog = () => {
        setOpenedit(false);
        setCurrentBP(null);
    }
    const editDialog = (
        <Dialog open={openEdit} onClose={() => {closeEditDialog()}} className={classes.dialog}>
            <DialogTitle>Edit capability</DialogTitle>
            <DialogContent>
                <TextField
                        label="Name"
                        type="text"
                        variant="filled"
                        color="primary"
                        defaultValue={currentBP === null ? "" : currentBP.name}
                        onChange={e => setNewName(e.target.value)}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        type="text"
                        variant="filled"
                        color="primary"
                        multiline
                        rowsMax={6}
                        rows={6}
                        defaultValue={currentBP === null ? "" : currentBP.description}
                        onChange={e => setNewDesc(e.target.value)}
                    />
                    
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {editBussinesProces()}}>Edit</Button>
                    <Button variant="text" color="primary" onClick={() => {closeEditDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
    return(
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <List>
            <ListSubheader className={classes.listSubHeader}>BussinesProces list</ListSubheader>
                {BussinesProces.map(bp => {
                    return (
                        <ListItem key={nanoid()}>
                            <ListItemText>{bp.name}</ListItemText>
                            <ListItemText>{bp.description}</ListItemText>
                            <ButtonGroup>
                                
                                <Button onClick={() => openEditDialog(bp)}>Edit</Button>
                                <Button onClick={() => openDeleteDialog(bp.id)}>Delete</Button>
                            </ButtonGroup>
                        </ListItem>
                    );
                })}
            </List>
            {editDialog}
            {deleteDialog}
            
        </Paper>

    );
};

export default BussinesProcesList;