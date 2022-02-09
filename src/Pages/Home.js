import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import HomePage from '../Components/HomePage/HomePage';
import { useParams } from 'react-router-dom';

export default function Home({props}) {
 
const {id} = useParams(props);

 console.log(id, 'props')

    return (
        <Container>

            <Typography sx={{mt:3}}>
                <HomePage id={id} />
            </Typography>
            
        </Container>
    )
}
