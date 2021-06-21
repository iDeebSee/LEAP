import React, { useEffect, useState, useCallback } from 'react';
import ResourcesService from '../services/ResourcesService';
import CapabilityService from '../services/Capability.service';
import _ from 'lodash';
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
    , DialogActions
    , ButtonGroup
    , Button
    , TextField
    , FormControl
    , InputLabel
    , Select
    , ListItemText
    , Checkbox
    , Input
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
    const [chosenCapabilities, setChosenCapabilities] = useState([]);
    const [capabilities, setCapabilities] = useState([]);

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


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const pathname = window.location.pathname;
    const urlArray = pathname.split('/');
    const envId = urlArray[2];
    const classes = useStyles();

    const getCapabilities = useCallback(() => {
        CapabilityService.getLinked(envId)
            .then(res => {
                console.log(res.data.message)
                console.table(res.data.data)
                setCapabilities(res.data.data)
            })
    }, [envId, setCapabilities]);

    /**
     * Wordt gebruikt om alle resources op te halen.
     */
    const getAllResources = () => {
        ResourcesService.getAll(envId).then(res => {
            console.log(res.data);
            setResources(res.data.data);

        });
    }


    /**
     * Opent een popup box met de vraag of je de resource zeker wilt verwijderen.
     * @param id de id van de resource die je wilt verwijderen.
     */
    const openDeleteDialog = (id) => {
        setOpenDelete(true);
        setResourceID(id);
        console.log(id);
    }

    /**
     * Opent een popup box waar de user input kan ingeven voor
     * de creatie van een nieuwe resourve.
     */
    const openCreateDialog = () => {
        setOpenCreate(true);
    }

    /**
     * Opent een edit popup box om een specifieke resource te wijzigen.
     * @param id verandert de huidige id.
     * @param _name verandert de huidige naam.
     * @param _description verandert de huidige beschrijving.
     */
    const openEditDialog = (id, _name, _description) => {
        setResourceID(id)
        setName(_name);
        setDescription(_description);
        console.log("open edit dialog: ", _description);
        setOpenEdit(true);
    }

    /**
     * Sluit een geopende delete popup box.
     */
    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    /**
     * Sluit een geopende create popup box.
     */
    const closeCreateDialog = () => {
        setOpenCreate(false);
    }

    /**
     * Sluit een geopende edit popup box.
     */
    const closeEditDialog = () => {
        setOpenEdit(false);
    }

    /**
     * Verwijdert een resource.
     */
    const deleteResource = () => {
        console.log(resourceID);
        ResourcesService.delete(resourceID).then(() => {
            getAllResources();
        })
        closeDeleteDialog();
    }

    /**
     * Creërt een resource op basis van de user input.
     */
    const createResource = () => {
        const data = { name, description }
        console.log(data);
        ResourcesService.create(envId, data, chosenCapabilities).then(() => {
            getAllResources();
        })
        closeCreateDialog();
    }

    /**
     * Wijzigt de parameters van een bestaande resource.
     */
    const editResource = () => {
        let data = { "name": name, "description": description };
        ResourcesService.update(resourceID, data).then(() => {

            getAllResources();
            closeEditDialog();
        });
        console.log("data in edit resource", data);
    }

    const handleEditChange = (capabilities) => {

        //make array of unique objects from input
        let output = _.uniqWith(capabilities, _.isEqual)

        //go through all the CURRENT capabilities IN THE OBJECT WE'RE EDITING
        chosenCapabilities.forEach(cap => {
            //left of and (&&): see if the current capability exists in the unique input
            //right of and (&&): see if the non unique input contains the current capability more than once
            //this results in any duplicates in the input being removed, unlinking the capability that was already in the strategy item
            if (_.find(output, cap) !== undefined && capabilities.filter(x => _.isEqual(x, cap)).length > 1) {
                _.remove(output, cap)
            }
        });

        setChosenCapabilities(output)
    }

    const joinSelectedItemNames = (selected) => {
        let output = []
        selected.forEach(item => {
            output.push(item.name);
        })

        return output.join(', ');
    }

    console.log("name and desc in class", name, description);

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
                    <FormControl>
                        <InputLabel id="multiple-select-checkbox-label">Capabilities</InputLabel>
                        <Select
                            labelId="multiple-select-checkbox-label"
                            id="multiple-select-checkbox"
                            multiple
                            value={chosenCapabilities}
                            onChange={(e) => { handleEditChange(e.target.value) }}
                            input={<Input />}
                            renderValue={selected => joinSelectedItemNames(selected)}
                            MenuProps={MenuProps}
                        >
                            {capabilities.map((capability) => {
                                return (
                                    <MenuItem key={capability.id} value={capability}>
                                        <Checkbox checked={chosenCapabilities.map(function (cap) { return cap.id }).indexOf(capability.id) > -1} />
                                        <ListItemText primary={capability.name} />
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
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

    useEffect(() => {
        getAllResources();
        getCapabilities();
    }, [getAllResources, getCapabilities])


    return (
        <Container maxWidth="lg" className={classes.container} style={{ width: '80%', maxWidth: 'none', }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Button variant="contained" color="primary" onClick={() => openCreateDialog()}>Add</Button>
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

                </Grid>
            </Grid>
            {deleteDialog}
            {createDialog}
            {editDialog}
        </Container>
    );
}