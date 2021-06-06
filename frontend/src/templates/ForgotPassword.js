import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NameField, EmailField } from '../components/AdminComponents/TextFields'
import AuthService from '../services/Auth.service';
import { Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '24rem'
  },
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

export default function ForgotPassword() {
  const classes = useStyles(),
  [name, setName] = useState(''),
  [email, setEmail] = useState(''),
  [nameFieldValid, setNameFieldValid] = useState(true),
  [emailFieldValid, setEmailFieldValid] = useState(true);

  const formValid = (name && nameFieldValid) && (email && emailFieldValid);

  const ValidateResetRequest = () => {
    if(formValid) {
      AuthService.requestReset({email: email, name: name})
        .then(res => {
          console.log(res.data.message)
        })
        .catch(e => {
          console.error(e);
        })
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography>Request password reset</Typography>
        <NameField value={name} setValue={setName} fieldValidity={nameFieldValid} setFieldValidity={setNameFieldValid}/>
        <EmailField value={email} setValue={setEmail} fieldValidity={emailFieldValid} setFieldValidity={setEmailFieldValid}/>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formValid}
            onClick={() => ValidateResetRequest()}
          >
            Request reset
        </Button>
      </Paper>
    </Container>
  );
}