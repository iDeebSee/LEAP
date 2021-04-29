import React from "react";
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Grid,
    makeStyles,
    Typography,
    Button,
    CardActions,
    ButtonGroup
} from '@material-ui/core';
import { nanoid } from 'nanoid';
import Lvl2CapabilityCard from "./Lvl2CapabilityCard";
import _ from 'lodash'
import CapabilityService from "../../services/CapabilityService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '&:hover': {
            '& $buttonGroup': {
                display: 'inline'
            }
        },
    },
    title: {
        fontSize: 14,
    },
    button: {
        textTransform: 'none',
    },
    buttonGroup: {
        display: 'none',
    },
}));

const Lvl1CapabilityCard = (props) => {
    const classes = useStyles(), { capability, lvl2Children, lvl3Children } = props.data;

    let Lvl2CardGrid;
    if(lvl2Children.length > 0) {
        Lvl2CardGrid =
        <Grid container spacing={2}>
            {
                lvl2Children.map(lvl2Cap => {
                    let children = [];
                    lvl3Children.forEach(lvl3Cap => {
                        if(_.isEqual(lvl3Cap.parent, lvl2Cap)) {
                            children.push(lvl3Cap);
                        }
                    });
                    return(
                        <Lvl2CapabilityCard key={nanoid()} data={{capability: lvl2Cap, children: children}}/>
                    )
                })
            }
        </Grid>
    }

    return(
        <Grid item xs>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>{capability.name}</Typography>
                    {Lvl2CardGrid}
                </CardContent>
                <CardActions>
                    <ButtonGroup color="primary" className={classes.buttonGroup}>
                        <Button component={Link} to={`/view/${capability.name}`} className={classes.button}>View</Button>
                        <Button className={classes.button} onClick={() => {CapabilityService.delete(capability.name)}}>Delete</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Lvl1CapabilityCard;