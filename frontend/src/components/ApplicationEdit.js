import React, { useState, useEffect } from 'react';
import ApplicationsService from '../services/ApplicationsService';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from './DatePicker';
import {
    Button, TextField, InputLabel, Select, MenuItem, Grid
} from '@material-ui/core';

export default function ApplicationEdit(props) {

    const [name, setName] = React.useState('');
    const [technology, setTechnology] = React.useState('');
    const [version, setVersion] = React.useState('');

    const [functionalCoverage, setFunctionalCoverage] = React.useState('');
    const [bfCorrectness, setBfCorrectness] = React.useState('');
    const [futurePotential, setFuturePotential] = React.useState('');
    const [completeness, setCompleteness] = React.useState('');
    const [iqCorrectness, setIqCorrectness] = React.useState('');
    const [availability, setAvailability] = React.useState('');
    const [currentScalability, setCurrentScalability] = React.useState('');
    const [expectedScalability, setExpectedScalability] = React.useState('');
    const [currentPerformance, setCurrentPerformance] = React.useState('');
    const [expectedPerformance, setExpectedPerformance] = React.useState('');

    const [acquisitionDate, setAcquisitionDate] = React.useState();
    const [endOfLife, setEndOfLife] = React.useState();
    const [timeValue, setTimeValue] = React.useState('');
    const [costCurrency, setCostCurrency] = React.useState('');

    const [currentTotalCostPerYear, setCurrentTotalCostPerYear] = React.useState('');
    const [toleratedTotalCostPerYear, setToleratedTotalCostPerYear] = React.useState('');

    const [currentSecurityLevel, setCurrentSecurityLevel] = React.useState('');
    const [expectedSecurityLevel, setExpectedSecurityLevel] = React.useState('');
    const [currentValueForMoney, setCurrentValueForMoney] = React.useState('');
    const [importance, setImportance] = React.useState('');
    const [efficiencySupport, setEfficiencySupport] = React.useState('');

    const [timeValues, setTimeValues] = React.useState([''])


    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const location = props.location.pathname;
    const urlArray = location.split('/');
    const id = urlArray[2];


    useEffect(() => {
        ApplicationsService.get(id).then(res => {
            console.log("id in useEffect", id);
            console.log("data", res);

            setName(res.data.name);
            setTechnology(res.data.technology);
            setVersion(res.data.version);
            setFunctionalCoverage(res.data.functionalCoverage);
            setBfCorrectness(res.data.bfCorrectness);
            setAcquisitionDate(res.data.acquisitionDate);
            setAvailability(res.data.availability);
            setCompleteness(res.data.completeness);
            setCostCurrency(res.data.costCurrency);
            setCurrentPerformance(res.data.currentPerformance);
            setCurrentScalability(res.data.currentScalability);
            setCurrentSecurityLevel(res.data.currentSecurityLevel);
            setCurrentTotalCostPerYear(res.data.currentTotalCostPerYear);
            setCurrentValueForMoney(res.data.currentValueForMoney);
            setEfficiencySupport(res.data.efficiencySupport);
            setEndOfLife(res.data.endOfLife);
            setExpectedPerformance(res.data.exptectedPerformance);
            setExpectedScalability(res.data.expectedScalability);
            setExpectedSecurityLevel(res.data.expectedSecurityLevel);
            setFuturePotential(res.data.futurePotential);
            setImportance(res.data.importance);
            setIqCorrectness(res.data.iqCorrectness);
            setToleratedTotalCostPerYear(res.data.toleratedTotalCostPerYear);
            setTimeValue(res.data.timeValue);
            console.log(res.data.endOfLife);
        });
        getTimeValues();
        update();
    }, [])


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

    const getTimeValues = () => {
        ApplicationsService.getTimeValues().then(res => {
            setTimeValues(res.data);
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        });
    }

    const handleChange = (event) => {
        setTimeValue(event.target.value);
        console.log(event.target.value);
    };


    const update = () => {

        ApplicationsService.update(id, {
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
            availability
        }).then(() => {
            ApplicationsService.get(id).then(res => {
                console.log("response", res);
                props.history.push('/applications/');
            })
        });
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        console.log(name);
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TextField style={{ padding: '10px', }} label="name" type="text" value={name} onChange={(e) => handleNameChange(e)} />
                </Grid>
                <Grid item xs={3}>
                    <TextField style={{ padding: '10px', }} label="technology" type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                    <TextField style={{ padding: '10px', }} label="version" type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                    <TextField style={{ padding: '10px', }} label="current total cost per year" type="number" value={currentTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setCurrentTotalCostPerYear(0) : setCurrentTotalCostPerYear(e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                    <TextField style={{ padding: '10px', }} label="tolerated total cost per year" type="number" value={toleratedTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setToleratedTotalCostPerYear(0) : setToleratedTotalCostPerYear(e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                    <DatePicker xs={3} style={{ padding: '10px', justifyContent: 'inherit', width: '80%', }} label="acquisition date" date={handleDateChange} name="Acquisition date" value={acquisitionDate} />
                </Grid>
                <Grid item xs={3}>
                    <DatePicker xs={3} style={{ padding: '10px', justifyContent: 'inherit', width: '80%', }} label="end of life" date={handleEndOfLife} name="End of life date" value={endOfLife} />
                </Grid>
                <Grid item xs={3}>
                    <InputLabel style={{ fontSize: '11px', position: 'relative', top: '20px', }} id="demo-simple-select-label">TIME Value</InputLabel>
                    <Select
                        style={{ position: 'relative', top: '20px', width: '80%', }}
                        xs={3}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={timeValues[timeValues.indexOf(timeValue)]}
                        onChange={handleChange}
                    >
                        {timeValues.map((tv, index) => (
                            <MenuItem key={index} value={tv}>{tv}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="current scalability" type="number" value={currentScalability} onChange={(e) => (e.target.value > 5) ? setCurrentScalability(5) : (e.target.value < 0) ? setCurrentScalability(0) : setCurrentScalability(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="expected scalability" type="number" value={expectedScalability} onChange={(e) => (e.target.value > 5) ? setExpectedScalability(5) : (e.target.value < 0) ? setExpectedScalability(0) : setExpectedScalability(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="current performance" type="number" value={currentPerformance} onChange={(e) => (e.target.value > 5) ? setCurrentPerformance(5) : (e.target.value < 0) ? setCurrentPerformance(0) : setCurrentPerformance(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="expected performance" type="number" value={expectedPerformance} onChange={(e) => (e.target.value > 5) ? setExpectedPerformance(5) : (e.target.value < 0) ? setExpectedPerformance(0) : setExpectedPerformance(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="current security level" type="number" value={currentSecurityLevel} onChange={(e) => (e.target.value > 5) ? setCurrentSecurityLevel(5) : (e.target.value < 0) ? setCurrentSecurityLevel(0) : setCurrentSecurityLevel(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="expected security level" type="number" value={expectedSecurityLevel} onChange={(e) => (e.target.value > 5) ? setExpectedSecurityLevel(5) : (e.target.value < 0) ? setExpectedSecurityLevel(0) : setExpectedSecurityLevel(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="cost currency" type="text" value={costCurrency} onChange={(e) => setCostCurrency(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="current value for money" type="number" value={currentValueForMoney} onChange={(e) => (e.target.value > 5) ? setCurrentValueForMoney(5) : (e.target.value < 0) ? setCurrentValueForMoney(0) : setCurrentValueForMoney(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="importance %" type="number" value={importance} onChange={(e) => (e.target.value > 100) ? setImportance(100) : (e.target.value < 0) ? setImportance(0) : setImportance(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="efficiencySupport" type="number" value={efficiencySupport} onChange={(e) => (e.target.value > 5) ? setEfficiencySupport(5) : (e.target.value < 0) ? setEfficiencySupport(0) : setEfficiencySupport(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="functional coverage" type="number" value={functionalCoverage} onChange={(e) => (e.target.value > 5) ? setFunctionalCoverage(5) : (e.target.value < 0) ? setFunctionalCoverage(0) : setFunctionalCoverage(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="correctness" type="number" value={bfCorrectness} onChange={(e) => (e.target.value > 5) ? setBfCorrectness(5) : (e.target.value < 0) ? setBfCorrectness(0) : setBfCorrectness(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="future potential" type="number" value={futurePotential} onChange={(e) => (e.target.value > 5) ? setFuturePotential(5) : (e.target.value < 0) ? setFuturePotential(0) : setFuturePotential(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="completeness" type="number" value={completeness} onChange={(e) => (e.target.value > 5) ? setCompleteness(5) : (e.target.value < 0) ? setCompleteness(0) : setCompleteness(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="correctness" type="number" value={iqCorrectness} onChange={(e) => (e.target.value > 5) ? setIqCorrectness(5) : (e.target.value < 0) ? setIqCorrectness(0) : setIqCorrectness(e.target.value)} /></Grid>
                <Grid item xs={3}><TextField xs={3} style={{ padding: '10px', }} label="availability" type="number" value={availability} onChange={(e) => (e.target.value > 5) ? setAvailability(5) : (e.target.value < 0) ? setAvailability(0) : setAvailability(e.target.value)} /></Grid>
                <Button style={{ margin: 'auto' }} onClick={update} color="primary">
                    Update
            </Button>
            </Grid>
        </div>
    )
}