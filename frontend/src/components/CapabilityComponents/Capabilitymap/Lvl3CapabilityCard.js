import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    ButtonGroup,
    Button,
    Grid,
    withStyles,
    Typography
} from '@material-ui/core';

const styles = (theme) => ({
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
});

class Lvl3CapabilityCard extends Component {
    /**
     * Constructor van Lvl3CapabilityCard
     * @param props gebruikte properties.
     */
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            capability: this.props.data
        };
    }

    /**
     * Verwijdert een specifieke level 3 capability (kan geen children hebben).
     * @param capability de level 3 capability die verwijdert moet worden
     */
    handleDelete(capability) {
        this.setState({capability: {}});
        this.props.handleDelete(capability);
    }

    render() {
        const { classes } = this.props, { capability } = this.state;

        return(
            <Grid item xs>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>{capability.name}</Typography>
                    </CardContent>
                    <CardActions>
                        <ButtonGroup color="primary" className={classes.buttonGroup}>
                            <Button component={Link} to={`/capabilities/${capability.id}`} className={classes.button}>View</Button>
                            <Button className={classes.button} onClick={() => {this.handleDelete(capability.id)}}>Delete</Button>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Lvl3CapabilityCard);