import { Button, makeStyles, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import React from 'react-dom';
import { useHistory, useParams } from 'react-router';
import { PasswordField } from '../components/AdminComponents/TextFields';
import PasswordService from '../services/Password.service';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '100%'
    },
}));  

export default function CreatePassword() {
    const classes = useStyles(),
    { token } = useParams(),
    history = useHistory(),
    [ password, setPassword ] = useState(''),
    [ passwordValid, setPasswordValid ] = useState(true);

    const formValid = password && passwordValid;

    useEffect(() => {
        PasswordService.checkCreateToken(token)
            .catch(e => {
                console.error(e);
                history.push("/sign_in");
            })
    }, [token, history]);

    const createPassword = () => {
        PasswordService.createPassword({token: token, password: password})
            .then(res => {
                console.log(res.data);
                history.push("/sign_in");
            })
            .catch(e => {
                console.error(e);
            })
    }

    return(
        <Paper className={classes.paper}>
            <PasswordField value={password} setValue={setPassword} fieldValidity={passwordValid} setFieldValidity={setPasswordValid}/>
            <Button
                fullWidth
                disabled={!formValid}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => createPassword()}
            >
                Reset password
            </Button>
        </Paper>
    );
}