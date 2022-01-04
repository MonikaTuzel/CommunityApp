import React from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContactForm from '../Components/ContactsPage/ContactForm';
import MessageBox from '../Components/ContactsPage/MessageBox';


const useStyles = makeStyles({
    mess: {
        display: 'flex',
        direction: 'row',
    }
    
})

export default function Contacts() {
    const classes = useStyles()

    return (
        <Container>
            <Typography
                variant='h3'
                color='textSecondary'
                component='h2'
                align="center"
                gutterBottom>
                Formularz kontaktowego
            </Typography>

            <Typography variant='body1'>
                Dalsza treść strony
            </Typography>

            <Typography className={classes.mess} >
                <MessageBox/>
                <ContactForm/>

            </Typography>

        </Container>
    )
}
