import React, { useState, useEffect } from 'react';
import ApplicationsService from '../services/ApplicationsService';
import 'date-fns';

import DatePicker from './DatePicker';
import {
    Button, TextField, InputLabel, Select, MenuItem
} from '@material-ui/core';

export default function ApplicationEdit(props) {
    const [app, setApp] = useState({})
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



    const location = props.location.pathname;
    const urlArray = location.split('/');
    const id = urlArray[2];
    

    useEffect(() => {
        ApplicationsService.get(id).then(res => {
            console.log("id in useEffect", id);
            console.log("data", res);

            setApp(res.data);
            console.log("time value", app.timeValue);
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



    return (
        <div>

            <TextField style={{ padding: '10px', }} id="standard-basic" label="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField style={{ padding: '10px', }} id="standard-basic" label="technology" type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} />
            <TextField style={{ padding: '10px', }} id="standard-basic" label="version" type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
            <TextField style={{ padding: '10px', }} id="standard-basic" label="current total cost per year" type="number" value={currentTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setCurrentTotalCostPerYear(0) : setCurrentTotalCostPerYear(e.target.value)} />
            <TextField style={{ padding: '10px', }} id="standard-basic" label="tolerated total cost per year" type="number" value={toleratedTotalCostPerYear} onChange={(e) => (e.target.value < 0) ? setToleratedTotalCostPerYear(0) : setToleratedTotalCostPerYear(e.target.value)} />
            <DatePicker style={{ padding: '10px', }} id="standard-basic"label="acquisition date" date={handleDateChange} name="Acquisition date" value={acquisitionDate} />
            <DatePicker style={{ padding: '10px', }} id="standard-basic"label="end of life" date={handleEndOfLife} name="End of life date" value={endOfLife} />

            <InputLabel style={{ fontSize: '11px', }} id="demo-simple-select-label">TIME Value</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeValues[timeValues.indexOf(timeValue)]}
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

            <Button onClick="" color="primary">
                Update
            </Button>

        </div>
    )
}