import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import "../styling/Index.css";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ap.be/">
                AP Hogeschool
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}