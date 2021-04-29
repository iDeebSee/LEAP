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
import CapabilityService from "../../services/CapabilityService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '&:hover': {
            '& $buttonGroup': {
                display: 'inline'
            }
        },
        width: '160px'
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

const Lvl3CapabilityCard = (props) => {
    const classes = useStyles(), capability = props.data;

    return(
        <Grid item xs>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>{capability.name}</Typography>
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

export default Lvl3CapabilityCard;