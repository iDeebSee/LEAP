import React, { useState, useEffect } from 'react';
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
import DatePicker from './DatePicker';
import {
    Button, TextField, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, InputLabel, Select, MenuItem
} from '@material-ui/core';
import SimpleMenu from './Menu';
import ApplicationsService from '../services/ApplicationsService';

function AddDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);



    const [name, setName] = React.useState("");
    const [technology, setTechnology] = React.useState("");
    const [version, setVersion] = React.useState("");

    const [functionalCoverage, setFunctionalCoverage] = React.useState(0);
    const [bfCorrectness, setBfCorrectness] = React.useState(0);
    const [futurePotential, setFuturePotential] = React.useState(0);
    const [completeness, setCompleteness] = React.useState(0);
    const [iqCorrectness, setIqCorrectness] = React.useState(0);
    const [availability, setAvailability] = React.useState(0);
    const [currentScalability, setCurrentScalability] = React.useState(0);
    const [expectedScalability, setExpectedScalability] = React.useState(0);
    const [currentPerformance, setCurrentPerformance] = React.useState(0);
    const [expectedPerformance, setExpectedPerformance] = React.useState(0);

    const [acquisitionDate, setAcquisitionDate] = React.useState();
    const [endOfLife, setEndOfLife] = React.useState();
    const [timeValue, setTimeValue] = React.useState('');
    const [costCurrency, setCostCurrency] = React.useState('€');

    const [currentTotalCostPerYear, setCurrentTotalCostPerYear] = React.useState(0);
    const [toleratedTotalCostPerYear, setToleratedTotalCostPerYear] = React.useState(0);

    const [currentSecurityLevel, setCurrentSecurityLevel] = React.useState(0);
    const [expectedSecurityLevel, setExpectedSecurityLevel] = React.useState(0);
    const [currentValueForMoney, setCurrentValueForMoney] = React.useState(0);
    const [importance, setImportance] = React.useState(0);
    const [efficiencySupport, setEfficiencySupport] = React.useState(0);

    const [timeValues, setTimeValues] = React.useState([])


    const values =
    {
        name,
        technology,
        version,
        currentTotalCostPerYear,
        toleratedTotalCostPerYear,
        functionalCoverage,
        bfCorrectness,
        futurePotential,
        completeness,
        iqCorrectness,
        availability,
        currentScalability,
        expectedScalability,
        currentPerformance,
        expectedPerformance,
        currentSecurityLevel,
        expectedSecurityLevel,
        currentValueForMoney,
        importance,
        efficiencySupport,
        acquisitionDate,
        endOfLife,
        timeValue,
        costCurrency,
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRow = () => {
        setOpen(false);
        console.log("handleRow in dialog");
        console.log(values);
        return values;
    }

    const handleDateChange = (date) => {
        if (date !== null || date !== undefined) {
            console.log(date);
            setAcquisitionDate(date)
            console.log("acq date " + date);

        }
    };

    const handleEndOfLife = (date) => {
        if (date !== null || date !== undefined) {
            console.log(date);
            setEndOfLife(date);
            console.log("eol date " + date);
        }
    };

    //TODO: MOET afgemaakt worden
    const addApp = () => {
        ApplicationsService.create();
    }

    const getTimeValues = () => {
        ApplicationsService.getTimeValues().then(res => {
            setTimeValues(res.data);
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        });
    }


    useEffect(() => {
        getTimeValues();

    }, []);

    const handleChange = (event) => {
        setTimeValue(event.target.value);
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
                    Add Application
        </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="technology" type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="version" type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="current total cost per year" type="number" value={currentTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setCurrentTotalCostPerYear(0) : setCurrentTotalCostPerYear(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="tolerated total cost per year" type="number" value={toleratedTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setToleratedTotalCostPerYear(0) : setToleratedTotalCostPerYear(e.target.value)} />
                        <DatePicker style={{ padding: '10px', }} id="standard-basic" label="acquisition date" date={handleDateChange} name="Acquisition date" value={acquisitionDate} />
                        <DatePicker style={{ padding: '10px', }} id="standard-basic" label="end of life" date={handleEndOfLife} name="End of life date" value={endOfLife} />

                        <InputLabel style={{ fontSize: '11px', }} id="demo-simple-select-label">TIME Value</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={timeValue}
                            onChange={handleChange}
                        >
                            {timeValues.map((tv, index) => (
                                <MenuItem key={index} value={tv}>{tv}</MenuItem>
                            ))}
                        </Select>

                        <TextField style={{ padding: '10px', }} id="standard-basic" label="current scalability" type="number" value={currentScalability} onChange={(e) => (e.target.value > 5) ? setCurrentScalability(5) : (e.target.value < 0) ? setCurrentScalability(0) : setCurrentScalability(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="expected scalability" type="number" value={expectedScalability} onChange={(e) => (e.target.value > 5) ? setExpectedScalability(5) : (e.target.value < 0) ? setExpectedScalability(0) : setExpectedScalability(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="current performance" type="number" value={currentPerformance} onChange={(e) => (e.target.value > 5) ? setCurrentPerformance(5) : (e.target.value < 0) ? setCurrentPerformance(0) : setCurrentPerformance(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="expected performance" type="number" value={expectedPerformance} onChange={(e) => (e.target.value > 5) ? setExpectedPerformance(5) : (e.target.value < 0) ? setExpectedPerformance(0) : setExpectedPerformance(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="current security level" type="number" value={currentSecurityLevel} onChange={(e) => (e.target.value > 5) ? setCurrentSecurityLevel(5) : (e.target.value < 0) ? setCurrentSecurityLevel(0) : setCurrentSecurityLevel(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="expected security level" type="number" value={expectedSecurityLevel} onChange={(e) => (e.target.value > 5) ? setExpectedSecurityLevel(5) : (e.target.value < 0) ? setExpectedSecurityLevel(0) : setExpectedSecurityLevel(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="cost currency" type="text" value={costCurrency} onChange={(e) => setCostCurrency(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="current value for money" type="number" value={currentValueForMoney} onChange={(e) => (e.target.value > 5) ? setCurrentValueForMoney(5) : (e.target.value < 0) ? setCurrentValueForMoney(0) : setCurrentValueForMoney(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="importance %" type="number" value={importance} onChange={(e) => (e.target.value > 100) ? setImportance(100) : (e.target.value < 0) ? setImportance(0) : setImportance(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="efficiencySupport" type="number" value={efficiencySupport} onChange={(e) => (e.target.value > 5) ? setEfficiencySupport(5) : (e.target.value < 0) ? setEfficiencySupport(0) : setEfficiencySupport(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="functional coverage" type="number" value={functionalCoverage} onChange={(e) => (e.target.value > 5) ? setFunctionalCoverage(5) : (e.target.value < 0) ? setFunctionalCoverage(0) : setFunctionalCoverage(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="correctness" type="number" value={bfCorrectness} onChange={(e) => (e.target.value > 5) ? setBfCorrectness(5) : (e.target.value < 0) ? setBfCorrectness(0) : setBfCorrectness(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="future potential" type="number" value={futurePotential} onChange={(e) => (e.target.value > 5) ? setFuturePotential(5) : (e.target.value < 0) ? setFuturePotential(0) : setFuturePotential(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="completeness" type="number" value={completeness} onChange={(e) => (e.target.value > 5) ? setCompleteness(5) : (e.target.value < 0) ? setCompleteness(0) : setCompleteness(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="correctness" type="number" value={iqCorrectness} onChange={(e) => (e.target.value > 5) ? setIqCorrectness(5) : (e.target.value < 0) ? setIqCorrectness(0) : setIqCorrectness(e.target.value)} />
                        <TextField style={{ padding: '10px', }} id="standard-basic" label="availability" type="number" value={availability} onChange={(e) => (e.target.value > 5) ? setAvailability(5) : (e.target.value < 0) ? setAvailability(0) : setAvailability(e.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Cancel
          </Button>
                    <Button onClick={() => props.values(handleRow())} color="primary">
                        Add
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

function createData(name, technology, version, currentTotalCostPerYear, toleratedTotalCostPerYear, acquisitionDate, endOfLife, timeValue, currentScalability, expectedScalability, currentPerformance, expectedPerformance, currentSecurityLevel, expectedSecurityLevel, costCurrency, currentValueForMoney, importance, efficiencySupport, functionalCoverage, bfCorrectness, futurePotential, completeness, iqCorrectness, availability) {
    return {
        name,
        technology,
        version,
        currentTotalCostPerYear,
        toleratedTotalCostPerYear,
        acquisitionDate,
        endOfLife,
        timeValue,
        currentScalability,
        expectedScalability,
        currentPerformance,
        expectedPerformance,
        currentSecurityLevel,
        expectedSecurityLevel,
        costCurrency,
        currentValueForMoney,
        importance,
        efficiencySupport,
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
    const classes = useRowStyles();


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <SimpleMenu />
                </TableCell>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell className={classes.border} align="center">{row.technology}</TableCell>
                <TableCell className={classes.border} align="center">{row.version}</TableCell>
                <TableCell className={classes.border} align="center">{row.currentTotalCostPerYear}</TableCell>
                <TableCell className={classes.border} align="center">{row.toleratedTotalCostPerYear}</TableCell>
                <TableCell className={classes.border} align="center">{row.acquisitionDate}</TableCell>
                <TableCell className={classes.border} align="center">{row.endOfLife}</TableCell>
                <TableCell className={classes.border} align="center">{row.timeValue}</TableCell>

                <TableCell className={classes.border} align="center">{row.currentScalability}</TableCell>
                <TableCell className={classes.border} align="center">{row.expectedScalability}</TableCell>
                <TableCell className={classes.border} align="center">{row.currentPerformance}</TableCell>
                <TableCell className={classes.border} align="center">{row.expectedPerformance}</TableCell>
                <TableCell className={classes.border} align="center">{row.currentSecurityLevel}</TableCell>
                <TableCell className={classes.border} align="center">{row.expectedSecurityLevel}</TableCell>
                <TableCell className={classes.border} align="center">{row.costCurrency}</TableCell>
                <TableCell className={classes.border} align="center">{row.currentValueForMoney}</TableCell>

                <TableCell className={classes.border} align="center" >{row.importance}</TableCell>
                <TableCell className={classes.border} align="center" >{row.efficiencySupport}</TableCell>
                <TableCell className={classes.border} align="center" >{row.functionalCoverage}</TableCell>
                <TableCell className={classes.border} align="center" >{row.bfCorrectness}</TableCell>
                <TableCell className={classes.border} align="center" >{row.futurePotential}</TableCell>
                <TableCell className={classes.border} align="center" >{row.completeness}</TableCell>
                <TableCell className={classes.border} align="center" >{row.iqCorrectness}</TableCell>
                <TableCell className={classes.border} align="center" >{row.availability}</TableCell>

            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        technology: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired,
        currentTotalCostPerYear: PropTypes.number.isRequired,
        toleratedTotalCostPerYear: PropTypes.number.isRequired,
        acquisitionDate: PropTypes.string.isRequired,
        endOfLife: PropTypes.string,
        timeValue: PropTypes.string.isRequired,
        currentScalability: PropTypes.number.isRequired,
        expectedScalability: PropTypes.number.isRequired,
        currentPerformance: PropTypes.number.isRequired,
        expectedPerformance: PropTypes.number.isRequired,
        currentSecurityLevel: PropTypes.number.isRequired,
        expectedSecurityLevel: PropTypes.number.isRequired,
        costCurrency: PropTypes.string,
        currentValueForMoney: PropTypes.number.isRequired,
        importance: PropTypes.number.isRequired,
        efficiencySupport: PropTypes.number.isRequired,
        functionalCoverage: PropTypes.number.isRequired,
        bfCorrectness: PropTypes.number.isRequired,
        futurePotential: PropTypes.number.isRequired,
        completeness: PropTypes.number.isRequired,
        iqCorrectness: PropTypes.number.isRequired,
        availability: PropTypes.number.isRequired,
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
    const [application, setApplication] = React.useState([]);

    const getApplications = () => {
        ApplicationsService.getAll().then(res => {
            setApplication(res.data);
            console.log("res data", res.data);
            console.log("app state ", application);
            application.map(item => (console.log(item)));

        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getApplications();
    }, [])

    const updateMap = (k, v) => {
        setMap(new Map(map.set(k, v)));
        console.log(k);
    }

    function handleRow() {
        updateMap(createData("App-" + teller++, 159, 6.0, 24, 4.0, 3.99, 1.5, 1.5, 1.5, 159, 6.0, 24, 4.0, 3.99, 1.5, 1.5, 1.5));
    }

    function getValues(values) {
        //console.log("getvalues:" + name, technology, version,functionalCoverage,bfCorrectness,futurePotential,completeness,iqCorrectness,availability,currentScalability,expectedScalability,currentPerformance,expectedPerformance,currentTotalCostPerYear,toleratedTotalCostPerYear,currentSecurityLevel,expectedSecurityLevel,currentValueForMoney,importance,efficiencySupport);

        updateMap(createData(values.name, values.technology, values.version, values.currentTotalCostPerYear, values.toleratedTotalCostPerYear,
            values.acquisitionDate, values.endOfLife, values.timeValue, values.currentScalability, values.expectedScalability, values.currentPerformance,
            values.expectedPerformance, values.currentSecurityLevel, values.expectedSecurityLevel, values.costCurrency, values.currentValueForMoney,
            values.importance, values.efficiencySupport, values.functionalCoverage, values.bfCorrectness, values.futurePotential, values.completeness,
            values.iqCorrectness, values.availability));
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Application</TableCell>
                        <TableCell align="right">Technology</TableCell>
                        <TableCell align="right">Version</TableCell>
                        <TableCell align="right" className={classes.costImpact}>Current total cost per year</TableCell>
                        <TableCell align="right" className={classes.costImpact}>Tolerated total cost per year</TableCell>
                        <TableCell align="right">Acquisition date</TableCell>
                        <TableCell align="right">End of life</TableCell>
                        <TableCell align="right">TIME value</TableCell>
                        <TableCell align="right" className={classes.technicalQuality}>Current scalability</TableCell>
                        <TableCell align="right" className={classes.technicalQuality}>Expected scalability</TableCell>
                        <TableCell align="right" className={classes.technicalQuality}>Current performance</TableCell>
                        <TableCell align="right" className={classes.technicalQuality}>Expected performance</TableCell>
                        <TableCell align="right" className={classes.technicalQuality}>Current security level</TableCell>
                        <TableCell align="right" className={classes.technicalQuality}>Expected security level</TableCell>
                        <TableCell align="right">Cost currency</TableCell>
                        <TableCell align="right" className={classes.costImpact}>Current value for money</TableCell>
                        <TableCell align="right" >importance</TableCell>
                        <TableCell align="right" className={classes.businessFit}>efficiencySupport</TableCell>
                        <TableCell align="right" className={classes.businessFit}>functionalCoverage</TableCell>
                        <TableCell align="right" className={classes.businessFit}>Correctness</TableCell>
                        <TableCell align="right">futurePotential</TableCell>
                        <TableCell align="right">completeness</TableCell>
                        <TableCell align="right" className={classes.informationQuality}>Correctness</TableCell>
                        <TableCell align="right">availability</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {[...map.keys()].map(k => (

                        <Row key={k.name} row={k} />
                    ))} */}
                    {[...application].map(app => (
                        <Row key={app.id} row={app} />
                    ))}
                </TableBody>
            </Table>
            <AddDialog values={getValues}></AddDialog>
            <Button onClick={handleRow}>Add</Button>
        </TableContainer>
    );
}