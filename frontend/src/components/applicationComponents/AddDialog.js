import React, { useEffect } from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../DatePicker';
import {
    Button, TextField, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, InputLabel, Select, MenuItem, Grid
} from '@material-ui/core';
import ApplicationsService from '../../services/ApplicationsService';

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

export default function AddDialog(props) {
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
    const [error, setError] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

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
        setDisabled(false);
        setError("");
        if ((date !== null || date !== undefined) && date < endOfLife) {
            console.log(date);
            setAcquisitionDate(date)
            console.log("acq date " + date);

        }else if (date > endOfLife) {
            setDisabled(true);
            setError("acquisition date should come before end of life date");
        }else if (date === null || date === undefined || date === "") {
            setDisabled(true);
            setError("fill in the required fields! (*)");
        }
    };

    const handleEndOfLife = (date) => {
        setDisabled(false);
        setError("");
        if ((date !== null || date !== undefined) && date > acquisitionDate) {

            console.log(date);
            setEndOfLife(date);
            console.log("eol date " + date);
        } else if (acquisitionDate > date) {
            setDisabled(true);
            setError("end of life date should come after acquisition date");
        } else if (date === null || date === undefined || date === "") {
            setDisabled(true);
            setError("fill in the required fields! (*)");

        }
    };

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
            {(props.open) ? handleClickOpen : handleClose}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'default' }} >
                    Add Application
        </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={3}>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="name" type="text" value={name} onChange={(e) => setName(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="technology" type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="version" type="text" value={version} onChange={(e) => setVersion(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="current total cost per year" type="number" value={currentTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setCurrentTotalCostPerYear(0) : setCurrentTotalCostPerYear(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="tolerated total cost per year" type="number" value={toleratedTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setToleratedTotalCostPerYear(0) : setToleratedTotalCostPerYear(e.target.value)} /></Grid>
                            <Grid item xs={6}><DatePicker style={{ padding: '10px', width: '80%', justifyContent: 'inherit', }} id="standard-basic" label="acquisition date" date={handleDateChange} name="Acquisition date*" value={acquisitionDate} /></Grid>
                            <Grid item xs={6}><DatePicker style={{ padding: '10px', width: '80%', justifyContent: 'inherit', }} id="standard-basic" label="end of life" date={handleEndOfLife} name="End of life date*" value={endOfLife} /></Grid>
                            <Grid item xs={6}><InputLabel style={{ fontSize: '11px', position: 'relative', top: '20px', }} id="demo-simple-select-label">TIME Value*</InputLabel>
                                <Select
                                    style={{ position: 'relative', top: '20px', width: '80%', }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={timeValue}
                                    onChange={handleChange}
                                >
                                    {timeValues.map((tv, index) => (
                                        <MenuItem key={index} value={tv}>{tv}</MenuItem>
                                    ))}
                                </Select></Grid>

                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="current scalability" type="number" value={currentScalability} onChange={(e) => (e.target.value > 5) ? setCurrentScalability(5) : (e.target.value < 0) ? setCurrentScalability(0) : setCurrentScalability(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="expected scalability" type="number" value={expectedScalability} onChange={(e) => (e.target.value > 5) ? setExpectedScalability(5) : (e.target.value < 0) ? setExpectedScalability(0) : setExpectedScalability(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="current performance" type="number" value={currentPerformance} onChange={(e) => (e.target.value > 5) ? setCurrentPerformance(5) : (e.target.value < 0) ? setCurrentPerformance(0) : setCurrentPerformance(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="expected performance" type="number" value={expectedPerformance} onChange={(e) => (e.target.value > 5) ? setExpectedPerformance(5) : (e.target.value < 0) ? setExpectedPerformance(0) : setExpectedPerformance(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="current security level" type="number" value={currentSecurityLevel} onChange={(e) => (e.target.value > 5) ? setCurrentSecurityLevel(5) : (e.target.value < 0) ? setCurrentSecurityLevel(0) : setCurrentSecurityLevel(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="expected security level" type="number" value={expectedSecurityLevel} onChange={(e) => (e.target.value > 5) ? setExpectedSecurityLevel(5) : (e.target.value < 0) ? setExpectedSecurityLevel(0) : setExpectedSecurityLevel(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="cost currency" type="text" value={costCurrency} onChange={(e) => setCostCurrency(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="current value for money" type="number" value={currentValueForMoney} onChange={(e) => (e.target.value > 5) ? setCurrentValueForMoney(5) : (e.target.value < 0) ? setCurrentValueForMoney(0) : setCurrentValueForMoney(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="importance %" type="number" value={importance} onChange={(e) => (e.target.value > 100) ? setImportance(100) : (e.target.value < 0) ? setImportance(0) : setImportance(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="efficiencySupport" type="number" value={efficiencySupport} onChange={(e) => (e.target.value > 5) ? setEfficiencySupport(5) : (e.target.value < 0) ? setEfficiencySupport(0) : setEfficiencySupport(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="functional coverage" type="number" value={functionalCoverage} onChange={(e) => (e.target.value > 5) ? setFunctionalCoverage(5) : (e.target.value < 0) ? setFunctionalCoverage(0) : setFunctionalCoverage(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="correctness" type="number" value={bfCorrectness} onChange={(e) => (e.target.value > 5) ? setBfCorrectness(5) : (e.target.value < 0) ? setBfCorrectness(0) : setBfCorrectness(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="future potential" type="number" value={futurePotential} onChange={(e) => (e.target.value > 5) ? setFuturePotential(5) : (e.target.value < 0) ? setFuturePotential(0) : setFuturePotential(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="completeness" type="number" value={completeness} onChange={(e) => (e.target.value > 5) ? setCompleteness(5) : (e.target.value < 0) ? setCompleteness(0) : setCompleteness(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="correctness" type="number" value={iqCorrectness} onChange={(e) => (e.target.value > 5) ? setIqCorrectness(5) : (e.target.value < 0) ? setIqCorrectness(0) : setIqCorrectness(e.target.value)} /></Grid>
                            <Grid item xs={6}><TextField style={{ padding: '10px', }} id="standard-basic" label="availability" type="number" value={availability} onChange={(e) => (e.target.value > 5) ? setAvailability(5) : (e.target.value < 0) ? setAvailability(0) : setAvailability(e.target.value)} /></Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Cancel
          </Button>
                    <Button disabled={disabled} onClick={() => props.values(handleRow())} color="primary">
                        Add
          </Button>

                </DialogActions>
                <h3 style={{ width: '80%', marginLeft: '10%', marginRight: '10%', }}>{error}</h3>
            </Dialog>
        </div>
    )
}
