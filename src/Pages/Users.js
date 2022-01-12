import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
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