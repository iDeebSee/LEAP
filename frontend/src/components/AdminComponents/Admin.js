import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button, ButtonGroup, Grid, Paper } from '@material-ui/core';
import AuthService from '../../services/Auth.service';
import UserList from './UserList';
import { EmailField, NameField } from '../TextFields'
import Transferlist from '../Transferlist'
import PasswordService from '../../services/Password.service';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        '& .MuiTextField-root, .MuiButtonGroup-root': {
            margin: theme.spacing(2),
        },
    },
    fixedHeight: {
        height: "42rem",
    },
    hidden: {
        display: 'none',
    },
    fixedWidth: {
        minWidth: "36rem"
    },
    grid: {
        '& *': {
            flexGrow: 1
        }
    },
    large: {
        flexGrow: 2
    },
}));

export default function Index() {
    const classes = useStyles(),
    [hideEdit, setHideEdit] = useState(true),
    [users, setUsers] = useState([]),
    [roles, setRoles] = useState([]),
    [chosenRoles, setChosenRoles] = useState([]),
    [id, setId] = useState(''),
    [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [nameFieldValid, setNameFieldValid] = useState(true),
    [emailFieldValid, setEmailFieldValid] = useState(true);

    const getRoles = useCallback(() => {
        AuthService.getRoles()
            .then(res => {
                console.log("incoming roles: ")
                console.table(res.data);
                setRoles(res.data);
            })
            .catch(e => {
                console.error(e);
            });
    }, []);

    const getUsers = useCallback(() => {
        AuthService.getAll()
            .then(res => {
                setUsers(res.data);
                console.log("incoming users: ")
                console.table(res.data);
            })
            .catch(e => {
                console.error(e);
            });
    }, []);

    useEffect(() => {
        getUsers();
        getRoles();
    }, [getUsers, getRoles]);

    const resetFields = () => {
        setName("");
        setEmail("");
        setChosenRoles([]);
    }

    const resetValidities = () => {
        setNameFieldValid(true);
        setEmailFieldValid(true);
    }

    const resetForm = () => {
        resetFields();
        resetValidities();
        setHideEdit(true);
        getRoles();
    }

    const fillEditForm = (user) => {
        setId(user.id);
        setName(user.name);
        setEmail(user.email);
        setChosenRoles(user.roles);
        setHideEdit(false);
    };

    const formValid = (name && nameFieldValid) && (email && emailFieldValid);

    const createUser = () => {
        if(formValid) {
            AuthService.register(name, email, chosenRoles)
            .then(res => {
                console.log(res.data);
                getUsers();
                resetForm();
                PasswordService.requestCreation(name, email)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(e => {
                        console.error(e);
                    })
            })
            .catch(e => {
                console.error(e);
            });
        }
    };

    const editUser = () => {
        if(formValid) {
            AuthService.update(id, {name: name, email: email, roles: chosenRoles})
            .then(res => {
                console.log(res.data);
                getUsers();
                resetForm();
            })
            .catch(e => {
                console.error(e);
            });
        }
    };

    const deleteUser = (id) => {
        AuthService.delete(id)
            .then(res => {
                console.info(res.data);
                getUsers();
            })
            .catch(e => {
                console.error(e);
            })
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={7}>
                <UserList users={users} onDelete={deleteUser} setUser={fillEditForm}/>
            </Grid>
            <Grid item className={!hideEdit && classes.hidden, classes.fixedWidth} xs={5}>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <NameField value={name} setValue={setName} fieldValidity={nameFieldValid} setFieldValidity={setNameFieldValid}/>
                            <EmailField value={email} setValue={setEmail} fieldValidity={emailFieldValid} setFieldValidity={setEmailFieldValid}/>
                        </Grid>
                        <Grid item>
                            <Transferlist leftItems={roles} setLeft={setRoles} rightItems={chosenRoles} setRight={setChosenRoles}/>
                        </Grid>
                        <Grid item>
                            <ButtonGroup>
                                <Button disabled={!formValid} onClick={() => {createUser()}}>Create</Button>
                                <Button onClick={() => {resetForm()}}>Cancel</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item className={hideEdit && classes.hidden} xs={5}>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <NameField value={name} setValue={setName} fieldValidity={nameFieldValid} setFieldValidity={setNameFieldValid}/>
                            <EmailField value={email} setValue={setEmail} fieldValidity={emailFieldValid} setFieldValidity={setEmailFieldValid}/>
                        </Grid>
                        <Grid item>
                            <Transferlist leftItems={roles} setLeft={setRoles} leftTitle={'Roles'} rightItems={chosenRoles} setRight={setChosenRoles} rightTitle={'Chosen roles'}/>
                        </Grid>
                        <Grid item>
                            <ButtonGroup>
                                <Button disabled={!formValid} onClick={() => {editUser()}}>Edit</Button>
                                <Button onClick={() => {resetForm()}}>Cancel</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}