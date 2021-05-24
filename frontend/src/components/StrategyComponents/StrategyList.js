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
    DialogContentText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import StrategyService from "../../services/Strategy.service";

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

const StrategyList = (props) => {
    const classes = useStyles(),
    strategies = props.data,
    [openEdit, setOpenedit] = useState(false),
    [openDelete, setOpenDelete] = useState(false),
    [newName, setNewName] = useState(''),
    [id, setId] = useState(''),
    [currentStrat, setCurrentStrat] = useState(null);

    const openDeleteDialog = (id) => {
        setOpenDelete(true);
        setId(id);
    }

    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    const deleteStrategy = () => {
        props.onCardDelete(id);
        closeDeleteDialog();
    }
    
    const deleteDialog = (
        <Dialog open={openDelete} onClose={() => {closeDeleteDialog()}} className={classes.dialog}>
            <DialogTitle>Are you sure you want to delete this strategy?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action cannot be reversed! 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {deleteStrategy()}}>Delete</Button>
                    <Button variant="text" color="primary" onClick={() => {closeDeleteDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
    

    const editStrategy = () => {
        let data = {"name": newName};
        StrategyService.update(id, data)
        .then(res => {
            console.log(res.data);
            props.getStrategies();
            setOpenedit(false);
        })
        .catch(e => {
            console.log(e);
        });
    };


    const openEditDialog = (strategy) => {
        setCurrentStrat(strategy);
        setId(strategy.id);
        setNewName(strategy.name);
        setOpenedit(true);
    };

    const closeEditDialog = () => {
        setOpenedit(false);
        setCurrentStrat(null);
    }

    const editDialog = (
        <Dialog open={openEdit} onClose={() => {closeEditDialog()}} className={classes.dialog}>
            <DialogTitle>Edit strategy</DialogTitle>
            <DialogContent>
                <TextField
                        label="Name"
                        type="text"
                        variant="filled"
                        color="primary"
                        defaultValue={currentStrat === null ? "" : currentStrat.name}
                        onChange={e => setNewName(e.target.value)}
                    />
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {editStrategy()}}>Edit</Button>
                    <Button variant="text" color="primary" onClick={() => {closeEditDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
    
    return(
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <List>
                <ListSubheader className={classes.listSubHeader}>Strategies</ListSubheader>
                {strategies.map(strat => {
                    return (
                        <ListItem key={nanoid()}>
                            <ListItemText>{strat.name}</ListItemText>
                            <ButtonGroup>
                                <Button component={Link} to={`/strategy/${strat.id}`}>View</Button>
                                <Button onClick={() => {openEditDialog(strat)}}>Edit</Button>
                                <Button onClick={() => {openDeleteDialog(strat.id)}}>Delete</Button>
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

export default StrategyList;