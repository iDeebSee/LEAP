import clsx from 'clsx';
import { Container, DialogContent, Grid, Paper, TextField, MenuItem, DialogActions, ButtonGroup, Button, Dialog, DialogTitle } from "@material-ui/core";
import React, { Component } from "react";
import CapabilityService from "../../services/CapabilityService";
import Lvl1CapabilityCard from './Lvl1CapabilityCard';
import { nanoid } from 'nanoid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    buttonGroup: {
        '& a, button': {
            textTransform: 'none',
        }
    },
    dialog: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(2),
            width: '100%'
        }
    }
});

class CapabilitiesCardList extends Component {
    constructor(props) {
        super(props);

        this.getCapabilities = this.getCapabilities.bind(this);
        this.getCapabilityChildren = this.getCapabilityChildren.bind(this);
        this.sortCapabilities = this.sortCapabilities.bind(this);
        this.onCardDelete = this.onCardDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.createCapability = this.createCapability.bind(this);

        this.newCapabilityName = React.createRef();

        this.state = {
            capabilities: [],
            lvl1Capabilities: [],
            lvl2Capabilities: [],
            lvl3Capabilities: [],
            open: false,
            newCapabilityName: '',
            newCapabilityDescription: '',
            newCapabilityParent: {},
        };
    }

    componentDidMount() {
        this.getCapabilities();
    }

    getCapabilities() {
        CapabilityService.getAll()
            .then(res => {
                this.setState({capabilities: res.data});
                console.log("incoming capabilities", res.data);
                this.sortCapabilities();
            })
            .catch(e => {
                console.log(e);
            });
    }

    sortCapabilities() {
        let lvl1Capabilities = [], lvl2Capabilities = [], lvl3Capabilities = [];
        this.state.capabilities.forEach(capability => {       
            switch(capability.level) {
                case 1: 
                    lvl1Capabilities.push(capability);
                    break;
                case 2:
                    lvl2Capabilities.push(capability);
                    break;
                case 3:
                    lvl3Capabilities.push(capability);
                    break;
                default:
                break;
                }
            });
        this.setState({lvl1Capabilities: lvl1Capabilities, lvl2Capabilities: lvl2Capabilities, lvl3Capabilities: lvl3Capabilities})
    }

    onCardDelete(capabilityId) {
        CapabilityService.delete(capabilityId)
        .then(() => {
            this.getCapabilities();
        });
    }

    getCapabilityChildren(capability) {
        const { lvl2Capabilities, lvl3Capabilities } = this.state;
        let lvl2Children = [], lvl3Children = [];

        lvl2Capabilities.forEach(lvl2Cap => {
            if(_.isEqual(lvl2Cap.parent, capability)) {
                lvl2Children.push(lvl2Cap);

                lvl3Capabilities.forEach(lvl3Cap => {
                    if(_.isEqual(lvl3Cap.parent, lvl2Cap)) {
                        lvl3Children.push(lvl3Cap)
                    }
                })
            }
        })

        return {capability: capability, lvl2Children: lvl2Children, lvl3Children: lvl3Children}
    }

    createCapability() {
        console.log(this.newCapabilityName.current.input)
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }


    render() {
        const { lvl1Capabilities } = this.state, 
        { classes } = this.props, 
        fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return(
            <Container>
                <Grid container spacing={3}>
                    {lvl1Capabilities.map(lvl1cap => {
                        return(
                            <Lvl1CapabilityCard key={nanoid()} data={this.getCapabilityChildren(lvl1cap)} handleDelete={this.onCardDelete}/>
                        )
                    })}
                </Grid>
                <Paper className={fixedHeightPaper}>
                    <ButtonGroup className={classes.buttonGroup}>
                        <Button variant="contained" color="primary" onClick={this.handleOpen}>Add Capability</Button>
                        <Button variant="contained" color="primary">Generate Capability Map</Button>
                        <Button variant="contained" color="primary">Delete All</Button>
                    </ButtonGroup>
                    <Dialog onClose={this.handleClose} open={this.state.open} className={classes.dialog}>
                        <DialogTitle>Create new capability</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Name"
                                type="text"
                                variant="filled"
                                color="primary"
                                required
                                ref={this.newCapabilityName}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                type="text"
                                variant="filled"
                                color="primary"
                                required
                                multiline
                                rowsMax={6}
                                rows={6}
                            />
                            <TextField
                                label="Parent"
                                select
                                variant="filled"
                                color="primary"
                                required
                                defaultValue='None'
                            >
                                <MenuItem value='None'>
                                    None
                                </MenuItem>
                                {this.state.lvl1Capabilities.map(cap => {
                                    return(
                                        <MenuItem key={nanoid()} value={cap}>
                                            {cap.name}
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <ButtonGroup>
                                <Button variant="text" color="primary" onClick={this.createCapability} type="submit">Create</Button>
                                <Button variant="text" color="primary" onClick={this.handleClose}>Cancel</Button>
                            </ButtonGroup>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(styles)(CapabilitiesCardList);