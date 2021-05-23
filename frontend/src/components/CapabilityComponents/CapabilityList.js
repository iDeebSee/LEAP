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
    DialogActions,
    TextField,
    MenuItem,
    DialogContentText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import CapabilityService from "../../services/CapabilityService";
import _ from 'lodash';

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

const CapabilityList = (props) => {
    const classes = useStyles(),
    capabilities = props.data,
    [openEdit, setOpenedit] = useState(false),
    [openDelete, setOpenDelete] = useState(false),
    [newName, setNewName] = useState(''),
    [newDesc, setNewDesc] = useState(''),
    [newParentId, setNewParentId] = useState(null),
    [id, setId] = useState(''),
    [currentCap, setCurrentCap] = useState(null);

    const openDeleteDialog = (id) => {
        setOpenDelete(true);
        setId(id);
    }

    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    const deleteCapability = () => {
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
                    <Button variant="text" color="primary" onClick={() => {deleteCapability()}}>Delete</Button>
                    <Button variant="text" color="primary" onClick={() => {closeDeleteDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
    

    const editCapability = () => {
        let data = {"name": newName, "description": newDesc};
        if(newParentId != null) {
            data.parentId = newParentId;
        }
        CapabilityService.update(id, data)
        .then(res => {
            console.log(res.data);
            props.getCapabilities();
            setOpenedit(false);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const notInHierarchy = (capability) => {
        let output = true;
        if(currentCap !== null) {
            if(capability.level > 1) {
                if(_.isEqual(currentCap, capability.parent.parent)) {
                    output = false
                } else if (_.isEqual(currentCap, capability.parent)) {
                    output = false
                } 
            }
            return output;
        }
    };

    const openEditDialog = (capability) => {
        setCurrentCap(capability);
        setId(capability.id);
        setNewName(capability.name);
        setNewDesc(capability.description);
        setOpenedit(true);
    };

    const closeEditDialog = () => {
        setOpenedit(false);
        setCurrentCap(null);
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
                        defaultValue={currentCap === null ? "" : currentCap.name}
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
                        defaultValue={currentCap === null ? "" : currentCap.description}
                        onChange={e => setNewDesc(e.target.value)}
                    />
                    <TextField
                        label="Parent"
                        select
                        variant="filled"
                        color="primary"
                        defaultValue={currentCap === null ? "None" : currentCap.parent === null ? "None" : currentCap.parent.id}
                        onChange={e => setNewParentId((e.target.value === "None" ? null : e.target.value))}
                    >
                        <MenuItem value='None'>
                            None
                        </MenuItem>
                        {capabilities.map(cap => {
                            if(!_.isEqual(cap, currentCap) && notInHierarchy(cap) && cap.level < 3) {
                                return(
                                    <MenuItem key={nanoid()} value={cap.id}>
                                        {cap.name}
                                    </MenuItem>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </TextField>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {editCapability()}}>Edit</Button>
                    <Button variant="text" color="primary" onClick={() => {closeEditDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
    
    return(
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <List>
                <ListSubheader className={classes.listSubHeader}>Capability list</ListSubheader>
                {capabilities.map(cap => {
                    return (
                        <ListItem key={nanoid()}>
                            <ListItemText>{cap.name}</ListItemText>
                            <ButtonGroup>
                                <Button component={Link} to={`/capabilities/${cap.id}`}>View</Button>
                                <Button onClick={() => {openEditDialog(cap)}}>Edit</Button>
                                <Button onClick={() => {openDeleteDialog(cap.id)}}>Delete</Button>
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

export default CapabilityList;