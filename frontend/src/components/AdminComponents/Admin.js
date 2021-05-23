import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button, ButtonGroup, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@material-ui/core';
import AuthService from '../../services/Auth.service';
import UserList from './UserList';
import { nanoid } from 'nanoid';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
        },
    },
    fixedHeight: {
        height: "42rem",
    },
    hidden: {
        display: 'none',
    },
    grid: {
        '& *': {
            flexGrow: 1
        }
    },
    large: {
        flexGrow: 2
    },
    customList: {
        width: 200,
        height: 230,
        overflow: 'auto',
    }
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function NameField(props) {
    const [error, setError] = useState(false),
    [errorMessage, setErrorMessage] = useState('');

    const changeName = (nameToValidate) => {
        if(nameToValidate && nameToValidate.length >= 3) {
            props.setName(nameToValidate);
            props.setCreateActive(true);
            setError(false);
            setErrorMessage("");
        } else {
            props.setCreateActive(false);
            setError(true);
            setErrorMessage("Name is too short!");
        }
        
    }

    return (
        <TextField
            label="Name"
            type="text"
            variant="filled"
            color="primary"
            required
            error={error}
            helperText={errorMessage}
            minLength={3}
            onChange={e => changeName(e.target.value)}
        />
    );
}

function EmailField(props) {
    const [error, setError] = useState(false),
    [errorMessage, setErrorMessage] = useState('');

    const changeEmail = (emailToValidate) => {
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate)) {
            props.setEmail(emailToValidate);
            props.setCreateActive(true);
            setError(false);
            setErrorMessage("");
        } else {
            props.setCreateActive(false);
            setError(true);
            setErrorMessage("Invalid email!");
        }
    }

    return (
        <TextField
        label="Email"
        type="email"
        variant="filled"
        color="primary"
        required
        error={error}
        helperText={errorMessage}
        onChange={e => changeEmail(e.target.value)}
    />
    );
}

function PasswordField(props) {
    const [error, setError] = useState(false),
    [errorMessage, setErrorMessage] = useState('');

    const changePassword = (passwordToValidate) => {
        if(passwordToValidate && passwordToValidate.length >= 8) {
            props.setPassword(passwordToValidate);
            props.setCreateActive(true);
            setError(false);
            setErrorMessage("");
        } else {
            props.setCreateActive(false);
            setError(true);
            setErrorMessage("Password is too short!");
        }
        
    }

    return (
        <TextField
            label="Password"
            type="text"
            variant="filled"
            color="primary"
            required
            error={error}
            helperText={errorMessage}
            minLength={8}
            onChange={e => changePassword(e.target.value)}
        />
    );
}

export default function Index() {
    const classes = useStyles(),
    [hideEdit, setHideEdit] = useState(false),
    [users, setUsers] = useState([]),
    [checked, setChecked] = useState([]),
    [left, setLeft] = useState(["user", "admin"]),
    [right, setRight] = useState([]),
    [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [createActive, setCreateActive] = useState(false);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const getUsers = () => {
        AuthService.getAll()
            .then(res => {
                setUsers(res.data);
                console.log("incoming users: ")
                console.table(res.data);
            })
            .catch(e => {
                console.error(e);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = () => {
        AuthService.register(name, email, password, right)
        .then(res => {
            console.log(res.data);
            getUsers();
        })
        .catch(e => {
            console.error(e);
        });
    }

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

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };
    
    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };
    
    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    
    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const listPanel = (items) => (
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
    )

    return (
        <Grid container spacing={3}>
            <Grid item xs={7}>
                <UserList data={users}/>
                <button onClick={() => {setHideEdit(!hideEdit)}}>swap</button>
            </Grid>
            <Grid item className={hideEdit && classes.hidden} xs>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <NameField setName={setName} setCreateActive={setCreateActive}/>
                    <EmailField setEmail={setEmail} setCreateActive={setCreateActive}/>
                    <PasswordField setPassword={setPassword} setCreateActive={setCreateActive}/>
                    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                        <Grid item>{listPanel(left)}</Grid>
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
                        <Grid item>{listPanel(right)}</Grid>
                    </Grid>
                    
                    <ButtonGroup>
                        <Button disabled={!createActive} onClick={() => {createUser()}}>Create</Button>
                        <Button>Cancel</Button>
                    </ButtonGroup>
                </Paper>
            </Grid>
            <Grid item className={!hideEdit && classes.hidden} xs>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <Typography>Edit</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}