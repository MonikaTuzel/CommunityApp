import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import UsersTableData from '../Components/UsersPage/UsersTableData';


export default function Contacts() {

        return(
            <Container>
                <Typography 
                variant='h3' 
                color='textSecondary'
                component='h2'
                align="center"
                gutterBottom>
                Lista użytkowników
                </Typography>
                               
               <UsersTableData  />

            </Container>
        )
    }