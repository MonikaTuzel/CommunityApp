import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccountInfoForm from '../Components/Setting/AccountInfoForm';
import ChangePasswordForm from '../Components/Setting/ChangePasswordForm';

const useStyles = makeStyles({
    mess: {
        display: 'flex',
        direction: 'column',
        flexFlow: 'stretch',
        background: 'white',
    },
    hist: {
        display: 'flex',
        direction: 'row',
        flexFlow: 'stretch',
        background: 'white',
    }

})

export default function Settings() {
    const classes = useStyles()

    return (
        <Container>
        
            <Typography >

                <Typography className={classes.hist}>

                    <AccountInfoForm />

                </Typography>

                <Typography className={classes.hist}>

                    <ChangePasswordForm />

                </Typography>

            </Typography>

        </Container>
    )
}
