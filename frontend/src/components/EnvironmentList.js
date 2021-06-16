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
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import EnvironmentService from "../services/Environment.Service";

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

const EnvironmentList = (props) => {
    const classes = useStyles(),
    Environments = props.data,
    history = useHistory(),
    [openEdit, setOpenedit] = useState(false),
    [openDelete, setOpenDelete] = useState(false),
    [newName, setNewName] = useState(''),
    [currentEnv, setCurrentEnv] = useState(null),
    [newDesc, setNewDesc] = useState(''),
    [id, setId] = useState('');


    const openDeleteDialog = (id) => {
        setOpenDelete(true);
        setId(id);
    }

    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    const deleteEnvironment = () => {
        props.onCardDelete(id);
        closeDeleteDialog();
        
    }
    const deleteDialog = (
        <Dialog open={openDelete} onClose={() => {closeDeleteDialog()}} className={classes.dialog}>
            <DialogTitle>Are you sure you want to delete this capability?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action cannot be reversed! Deleting this capability will also delete all of it's children!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {deleteEnvironment()}}>Delete</Button>
                    <Button variant="text" color="primary" onClick={() => {closeDeleteDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>);

    const editEnvironment = () => {
        let data = {"name": newName, "description": newDesc};
        
        EnvironmentService.update(id, data)
        .then(res => {
            console.log(res.data);
            props.getenvironments();
            setOpenedit(false);
        })
        .catch(e => {
            console.log(e);
        });
    }
    const openEditDialog = (environment) => {
        setCurrentEnv(environment);
        setId(environment.id);
        setNewName(environment.name);
        setNewDesc(environment.description);
        setOpenedit(true);
    };
    const closeEditDialog = () => {
        setOpenedit(false);
        setCurrentEnv(null);
    }
    

    const selectEnv = (id) => {
        props.setEnvId(id);
        history.push(`/capabilities/${id}`)
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
                        defaultValue={currentEnv === null ? "" : currentEnv.name}
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
                        defaultValue={currentEnv === null ? "" : currentEnv.description}
                        onChange={e => setNewDesc(e.target.value)}
                    />
                    
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {editEnvironment()}}>Edit</Button>
                    <Button variant="text" color="primary" onClick={() => {closeEditDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
    return(
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <List>
            <ListSubheader className={classes.listSubHeader}>Environment list</ListSubheader>
                {Environments.map(env => {
                    return (
                        <ListItem key={nanoid()}>
                            <ListItemText>{env.name}</ListItemText>
                            <ButtonGroup>
                                <Button onClick={() => selectEnv(env.id)}>View</Button>
                                <Button onClick={() => openEditDialog(env)}>Edit</Button>
                                <Button onClick={() => openDeleteDialog(env.id)}>Delete</Button>
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

export default EnvironmentList;