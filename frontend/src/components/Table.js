import React, { useState } from 'react';
import 'date-fns';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import SimpleMenu from './Menu'

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

    const updateMap = (k, v) => {
        setMap(new Map(map.set(k, v)));
        console.log(k);
    }

    function handleRow() {
        updateMap(createData("App-" + teller++, 159, 6.0, 24, 4.0, 3.99, 1.5, 1.5, 1.5, 159, 6.0, 24, 4.0, 3.99, 1.5, 1.5, 1.5));
    }

    /*
    function getValues(values) {
        //console.log("getvalues:" + name, technology, version,functionalCoverage,bfCorrectness,futurePotential,completeness,iqCorrectness,availability,currentScalability,expectedScalability,currentPerformance,expectedPerformance,currentTotalCostPerYear,toleratedTotalCostPerYear,currentSecurityLevel,expectedSecurityLevel,currentValueForMoney,importance,efficiencySupport);

        updateMap(createData(values.name, values.technology, values.version, values.currentTotalCostPerYear, values.toleratedTotalCostPerYear,
            values.acquisitionDate, values.endOfLife, values.timeValue, values.currentScalability, values.expectedScalability, values.currentPerformance,
            values.expectedPerformance, values.currentSecurityLevel, values.expectedSecurityLevel, values.costCurrency, values.currentValueForMoney,
            values.importance, values.efficiencySupport, values.functionalCoverage, values.bfCorrectness, values.futurePotential, values.completeness,
            values.iqCorrectness, values.availability));
    }
    */

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
                    {[...map.keys()].map(k => (

                        <Row key={k.name} row={k} />
                    ))}
                </TableBody>
            </Table>
            <Button onClick={handleRow}>Add</Button>
        </TableContainer>
    );
}