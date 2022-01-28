import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import UsersTableData from '../Components/UsersPage/UsersTableData';


export default function Contacts() {

        return(
            <Container sx={{mt:3}}>                
                               
               <UsersTableData  />

            </Container>
        )
    }