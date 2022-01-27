import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';


const useStyles = makeStyles({

    contc: {
        width: 'auto',
        height: 'auto',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '15px',
    }
})

export default function Contacts() {
    const classes = useStyles()
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(variables.API_URL_DELIVERY_BROWSE)
            .then((data) => data.json())
            .then((data) => setTableData(data))
    })


    return (
        <Container sx={{ padding: 0 }}  >

            <Typography className={classes.contc} p={1}
                sx={{ boxShadow: 10, border: 2, borderColor: '#c5cae9' }}  >

                <Typography
                    variant='h5'
                    color='#e8eaf6'
                    component='h2'
                    align="center"
                    sx={{
                        border: 1,
                        borderRadius: '15px',
                        borderColor: '#7986cb',
                        boxShadow: 5,
                        background: '#5c6bc0',
                        width: "80%",
                    }}>
                    Zmiana hasła                    
                    
                </Typography>
               
            </Typography>

        </Container>
    )
}
