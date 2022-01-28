import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilesForm from '../Components/Files/FilesForm';

const useStyles = makeStyles({
    mess: {    
        display: 'flex',
        direction: 'row',
        flexFlow: 'stretch',  
        background: 'white',   
    }    
})

export default function Files() {
    const classes = useStyles()

    return (
        <Container>
           
            <Typography className={classes.mess} sx={{mt:3}}>
                <FilesForm/>
            </Typography>

        </Container>
    )
}
