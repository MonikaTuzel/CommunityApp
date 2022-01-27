import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import AdressesTable from '../Components/AdressesPage/AdressesTable';


export default function Contacts() {
 
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
