import React, { useState, useEffect } from 'react';
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
import { MenuItem, Dialog, DialogTitle, DialogContentText, DialogContent, ButtonGroup, Button, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom'
import SimpleMenu from '../Menu';
import ApplicationsService from '../../services/ApplicationsService';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddDialog from './AddDialog';

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
    const [openDelete, setOpenDelete] = useState(false);

    const deleteRow = (row) => {

        console.log("deleteRow", row.id);
        props.delete(row.id);
    }

    const dialog = (
        <AddDialog></AddDialog>
    );

    const openDeleteDialog = () => {
        setOpenDelete(true);

    }

    const closeDeleteDialog = () => {
        setOpenDelete(false);
    }

    const deleteDialog = (
        <Dialog open={openDelete} onClose={() => { closeDeleteDialog() }} className={classes.dialog}>
            <DialogTitle>Are you sure you want to delete this application?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action cannot be reversed!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => deleteRow(row)}>Delete</Button>
                    <Button variant="text" color="primary" onClick={() => { closeDeleteDialog() }}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );

    const menuItems = (
        <>
            <MenuItem ><Link to={"/applications/" + row.id}><EditIcon></EditIcon></Link></MenuItem>
            <MenuItem onClick={() => openDeleteDialog()}><DeleteIcon></DeleteIcon></MenuItem>
        </>
    );


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <SimpleMenu dialog={dialog} menu={menuItems} />
                    {/* <MenuItem onClick={() => deleteRow(row)}><DeleteIcon></DeleteIcon></MenuItem> */}
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
            {deleteDialog}
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

    function getApplications() {
        ApplicationsService.getAll().then(res => {
            setApplication(res.data);
            console.log("res data", res.data);
            console.log("app state ", application);
            application.map(item => (console.log(item)));

        }).catch(err => {
            console.log(err);
        });
    }

    function deleteApplication(id) {
        ApplicationsService.delete(id).then(() => {
            console.log("after delete", application);
            console.log("after delete id", id);
            getApplications();
        });
    }

    useEffect(() => {
        getApplications();
        console.log("application after use effect", application);
    }, [])

    const updateMap = (k, v) => {
        setMap(new Map(map.set(k, v)));
        console.log(k);
    }

    function getValues(values) {

        console.log("values", values);
        ApplicationsService.create(values)
            .then(res => {
                console.log(res);
                updateMap(createData(values.name, values.technology, values.version, values.currentTotalCostPerYear, values.toleratedTotalCostPerYear,
                    values.acquisitionDate, values.endOfLife, values.timeValue, values.currentScalability, values.expectedScalability, values.currentPerformance,
                    values.expectedPerformance, values.currentSecurityLevel, values.expectedSecurityLevel, values.costCurrency, values.currentValueForMoney,
                    values.importance, values.efficiencySupport, values.functionalCoverage, values.bfCorrectness, values.futurePotential, values.completeness,
                    values.iqCorrectness, values.availability))
                getApplications();
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <TableContainer component={Paper} style={{ width: '100%', maxWidth: 'none', }}>
            <AddDialog values={getValues}></AddDialog>
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
                        <Row key={app.id} row={app} delete={deleteApplication} />
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}