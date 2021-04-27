import { makeStyles } from '@material-ui/core/styles';
import { ListItemText, ListItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid silver',
        marginTop: '-1px',
        "&:first-child": {
            borderRadius: "5px 5px 0px 0px",
        },
        "&:last-child": {
            borderRadius: "0px 0px 5px 5px",
        },
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


const CapabilityListItem = (data) => {
    const capability = data.capability, classes = useStyles();
    let parent;
    if(capability.parent != null) {
        parent = <ListItemText>Parent name: {capability.parent.name}</ListItemText>
    }

    return (
        <ListItem className={classes.root}>
            <ListItemText>Name &amp; Level: {capability.name} - {capability.level}</ListItemText>
            {parent}
        </ListItem>
    )
}

export default CapabilityListItem;