import React from "react";
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    ButtonGroup,
    Button,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { nanoid } from 'nanoid';
import Lvl3CapabilityCard from "./Lvl3CapabilityCard";
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

const Lvl2CapabilityCard = (props) => {
    const classes = useStyles(), { capability, children } = props.data;

    let Lvl3CardGrid;
    if(children.length > 0) {
        Lvl3CardGrid =
        <Grid container spacing={2}>
            {
                children.map(lvl3Cap => {
                    return (
                        <Lvl3CapabilityCard key={nanoid()} data={lvl3Cap}/>
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
                    {Lvl3CardGrid}
                </CardContent>
                <CardActions>
                    <ButtonGroup color="primary" className={classes.buttonGroup}>
                        <Button component={Link} to={`/view/${capability.name}`} className={classes.button}>View</Button>
                        <Button className={classes.button} onClick={() => {CapabilityService.delete(capability.name)}}>Delete</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Lvl2CapabilityCard;