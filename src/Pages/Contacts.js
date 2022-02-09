import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContactForm from '../Components/ContactsPage/ContactForm';
import MessageBox from '../Components/ContactsPage/MessageBox';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
    mess: {    
        display: 'flex',
        direction: 'row',
        flexFlow: 'stretch',  
        background: 'white',   
    }    
})

export default function Contacts({props}) {
    const classes = useStyles()
    const {id} = useParams(props);

    return (
        <Container>
           
            <Typography className={classes.mess} sx={{mt:3}}>
                <MessageBox id={id}/>
                <ContactForm id={id}/>

            </Typography>

        </Container>
    )
}
