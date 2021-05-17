import React, { useState } from 'react';
import 'date-fns';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
    Button, TextField, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions
} from '@material-ui/core';
import SimpleMenu from './Menu';

function AddDialog() {
    const dialogStyles = makeStyles({
        businessFit: {
            backgroundColor: 'red',
        },
        informationQuality: {
            backgroundColor: 'orange',
        },
        technicalQuality: {
            backgroundColor: 'blue',
        },
        costImpact: {
            backgroundColor: 'green',
        },
        inputPadding: {
            backgroundColor: '10px',
        }
    })
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [productivity, setProductivity] = React.useState(0);
    const [applicationName, setApplicationName] = React.useState("")
    const [capability, setCapability] = React.useState("");
    const [functionalCoverage, setFunctionalCoverage] = React.useState(0);
    const [bfCorrectness, setBfCorrectness] = React.useState(0);
    const [futurePotential, setFuturePotential] = React.useState(0);
    const [completeness, setCompleteness] = React.useState(0);
    const [iqCorrectness, setIqCorrectness] = React.useState(0);
    const [availability, setAvailability] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'default' }} id="draggable-dialog-title">
                    Subscribe
        </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="name" />
                        <TextField className={classes.bussinessFit} style={{ padding: '10px', }} id="standard-basic" label="productivity" type="number" value={productivity} onChange={(e) => (e.target.value > 5) ? setProductivity(5) : (e.target.value < 0) ? setProductivity(0) : setProductivity(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="functional coverage" type="number" value={functionalCoverage} onChange={(e) => (e.target.value > 5) ? setFunctionalCoverage(5) : (e.target.value < 0) ? setFunctionalCoverage(0) : setFunctionalCoverage(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="correctness" type="number" value={bfCorrectness} onChange={(e) => (e.target.value > 5) ? setBfCorrectness(5) : (e.target.value < 0) ? setBfCorrectness(0) : setBfCorrectness(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="future potential" type="number" value={futurePotential} onChange={(e) => (e.target.value > 5) ? setFuturePotential(5) : (e.target.value < 0) ? setFuturePotential(0) : setFuturePotential(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="completeness" type="number" value={completeness} onChange={(e) => (e.target.value > 5) ? setCompleteness(5) : (e.target.value < 0) ? setCompleteness(0) : setCompleteness(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="correctness" type="number" value={iqCorrectness} onChange={(e) => (e.target.value > 5) ? setIqCorrectness(5) : (e.target.value < 0) ? setIqCorrectness(0) : setIqCorrectness(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="availability" type="number" value={availability} onChange={(e) => (e.target.value > 5) ? setAvailability(5) : (e.target.value < 0) ? setAvailability(0) : setAvailability(e.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {

        },
    },
    border: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
    }
});

function createData(name, capability, productivity, functionalCoverage, bfCorrectness, futurePotential, completeness, iqCorrectness, availability) {
    return {
        name,
        capability,
        productivity,
        functionalCoverage,
        bfCorrectness,
        futurePotential,
        completeness,
        iqCorrectness,
        availability,
    };
}


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton> */}
                    <SimpleMenu />
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell className={classes.border} align="center">{row.capability}</TableCell>
                <TableCell className={classes.border} align="center">{row.productivity}</TableCell>
                <TableCell className={classes.border} align="center">{row.functionalCoverage}</TableCell>
                <TableCell className={classes.border} align="center">{row.bfCorrectness}</TableCell>
                <TableCell className={classes.border} align="center">{row.futurePotential}</TableCell>
                <TableCell className={classes.border} align="center">{row.completeness}</TableCell>
                <TableCell className={classes.border} align="center">{row.iqCorrectness}</TableCell>
                <TableCell className={classes.border} align="center">{row.availability}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};


let teller = 0;

const useStyles = makeStyles({
    businessFit: {
        color: 'red',
    },
    informationQuality: {
        color: 'orange',
    },
    technicalQuality: {
        color: 'blue',
    },
    costImpact: {
        color: 'green',
    },
    inputPadding: {
        padding: '10px',
    }
})

export default function SimpleTable() {
    const classes = useStyles();
    const [map, setMap] = useState(new Map());

    const updateMap = (k, v) => {
        setMap(new Map(map.set(k, v)));
        console.log(k);
    }

    function handleRow() {
        updateMap(createData("App-" + teller++, 159, 6.0, 24, 4.0, 3.99, 1.5, 1.5, 1.5));
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>App</TableCell>
                        <TableCell align="right" >Capability</TableCell>
                        <TableCell align="right" className={classes.businessFit}>Productivity</TableCell>
                        <TableCell align="right" className={classes.businessFit}>Functional coverage</TableCell>
                        <TableCell align="right" className={classes.businessFit}>Correctness</TableCell>
                        <TableCell align="right" className={classes.businessFit}>Future potential</TableCell>
                        <TableCell align="right" className={classes.informationQuality}>Completeness</TableCell>
                        <TableCell align="right" className={classes.informationQuality}>Correctness</TableCell>
                        <TableCell align="right" className={classes.informationQuality}>Availability</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...map.keys()].map(k => (

                        <Row key={k.name} row={k} />
                    ))}
                </TableBody>
            </Table>
            <AddDialog></AddDialog>
            <Button onClick={handleRow}>Add</Button>
        </TableContainer>
    );
}