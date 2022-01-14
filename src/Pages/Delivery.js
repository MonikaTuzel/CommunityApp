import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PlaningDeliveryTable from '../Components/DeliveryPage/PlaningDeliveryTable';
import HistoryDeliveryTable from '../Components/DeliveryPage/HistoryDeliveryTable';
import AllDeliveryTable from '../Components/DeliveryPage/AllDeliveryTable';



const useStyles = makeStyles({
    mess: {    
        display: 'flex',
        direction: 'column',
        flexFlow: 'stretch',  
        margin: 50, 
        background: 'white',  
    },
    hist: {    
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
                Dostawy                
            </Typography>

            <Typography >
                <Typography className={classes.hist}>
                    <HistoryDeliveryTable />
                    <PlaningDeliveryTable />
                </Typography>

                    <AllDeliveryTable />

            </Typography>

        </Container>
    )
}
