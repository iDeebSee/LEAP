import { Button, makeStyles, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import React from 'react-dom';
import { useHistory, useParams } from 'react-router';
import { PasswordField } from '../components/TextFields';
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

/**
 * Reset het wachtwoord van een gebruiker.
 * @returns Een JSX element met de optie om je wachtwoord te resetten.
 */
export default function ResetPassword() {
    const classes = useStyles(),
    { token } = useParams(),
    history = useHistory(),
    [ password, setPassword ] = useState(''),
    [ passwordValid, setPasswordValid ] = useState(true);

    const formValid = password && passwordValid;

    useEffect(() => {
        PasswordService.checkEditToken(token)
            .catch(e => {
                console.error(e);
                history.push("/sign_in");
            })
    }, [token, history]);

    /**
     * Wijzigt het wachtwoord.
     */
    const resetPassword = () => {
        PasswordService.editPassword({token: token, password: password})
            .then(res => {
                console.log(res.data.message);
                history.push("/sign_in");
            })
            .catch(e => {
                console.error(e);
            })
    };
    
    return(
        <Paper className={classes.paper}>
            <PasswordField value={password} setValue={setPassword} fieldValidity={passwordValid} setFieldValidity={setPasswordValid}/>
            <Button
                fullWidth
                disabled={!formValid}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => resetPassword()}
            >
                Reset password
            </Button>
        </Paper>
    );
}