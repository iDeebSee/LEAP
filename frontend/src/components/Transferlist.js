import React, { useState } from 'react';
import { Button, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    customList: {
        width: 200,
        height: 230,
        overflow:'scroll',
    }
}));
/**
 * Controllert de values links en rechts, zodat ze niet hetzelfde zijn. 
 */
function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

/**
 * Controleert of de values bestaan aan beide kanten
 */
function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({leftItems, setLeft, leftTitle, rightItems, setRight, rightTitle}) {
    const classes = useStyles(), 
    [checked, setChecked] = useState([]);

    let left;
    if(rightItems.length > 0) {
        left = not(leftItems, rightItems)
    } else {
        left = leftItems;
    }

    const right = rightItems;
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (item) => () =>{
        const currentIndex = checked.indexOf(item);
        const newChecked = [...checked];
    
        if(currentIndex === -1) {
            newChecked.push(item);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    /**
     * Zet alle items van links naar de rechts.
     */
    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    /**
     * De item van de rechterkant dat is gecontroleert wordt naar links verplaatst.
     */
    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    /**
     * Geeft een array terug van alle items die in A zitten die niet gelijkaardig zijn aan een item die in B zitten.
     */
    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    /**
     * Zet alle items van rechts naar links.
     */
    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const ListPanel = ({items, title, align}) => (
        <div>
            <Typography align={align}>{title}</Typography>
            <Paper className={classes.customList}>
                <List>
                    {items.map((item) => {
                        const labelId = `transfer-list-item-${item}-label`;
        
                        return(
                            <ListItem key={nanoid()} role="listitem" button onClick={handleToggle(item)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(item) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={item}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </div>
    )

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                    <Grid item><ListPanel items={left} title={leftTitle} align={"left"}/></Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleAllLeft}
                                disabled={right.length === 0}
                                aria-label="move all left"
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item><ListPanel items={right}  title={rightTitle} align={"right"}/></Grid>
                </Grid>
    );
}

TransferList.propTypes = {
    leftItems: PropTypes.array.isRequired, 
    setLeft: PropTypes.func.isRequired, 
    rightItems: PropTypes.array.isRequired, 
    setRight: PropTypes.func.isRequired
}