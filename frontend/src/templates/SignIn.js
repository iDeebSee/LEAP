import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {/*FormControlLabel, Checkbox,*/ Paper} from '@material-ui/core';
import { useState } from 'react';
import AuthService from '../services/Auth.service';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: theme.palette.error.main
  }
}));

export default function SignIn() {
  const classes = useStyles(),
  history = useHistory(),
  [email, setEmail] = useState(''),
  [password, setPassword] = useState(''),
  [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(email, password)
      .then((data) => {
        setError(false);
        history.push("/home")
        window.location.reload();
      }).catch(e => {
        console.error(e.response)
        setError(true);
      });
  }

  let errorMessage;
  if(error) {
    errorMessage = (
      <Typography className={classes.errorMessage} component="p" display="block" gutterBottom >
        We couldn't find a user with that email and password, please try again.
      </Typography>
    );
  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign in
        </Typography>
        {errorMessage}
        <form className={classes.form} onSubmit={(e) => handleLogin(e)}>
          <TextField
            error={error}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {setEmail(e.target.value);}}
          />
          <TextField
            error={error}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {setPassword(e.target.value);}}
          />
          {/* 
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          */}
          <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="/request_reset" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
