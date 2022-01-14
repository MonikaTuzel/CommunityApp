import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AdressesTable from '../Components/AdressesPage/AdressesTable';


const useStyles = makeStyles({
    mess: {    
        display: 'flex',
        direction: 'row',
        flexFlow: 'stretch',  
        margin: 50, 
        background: 'white',   
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
                Lista adresów 
            </Typography>

            <Typography>
                <AdressesTable/>
            </Typography>

        </Container>
    )
}
