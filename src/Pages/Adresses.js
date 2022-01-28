import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import AdressesTable from '../Components/AdressesPage/AdressesTable';


export default function Contacts() {
 
    return (
        <Container>

            <Typography sx={{mt:3}}>
                <AdressesTable />
            </Typography>

        </Container>
    )
}
