import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PlaningDeliveryTable from '../Components/DeliveryPage/PlaningDeliveryTable';
import HistoryDeliveryTable from '../Components/DeliveryPage/HistoryDeliveryTable';
import AllDeliveryTable from '../Components/DeliveryPage/AllDeliveryTable';
import { useParams } from 'react-router-dom';

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

export default function Delivery({props}) {
    const classes = useStyles()
    const {id} = useParams(props);

    return (
        <Container>

            <Typography sx={{mt:3}}>
                <Typography className={classes.hist}>
                    <HistoryDeliveryTable id={id} />
                    <PlaningDeliveryTable id={id} />
                </Typography>

                    <AllDeliveryTable id={id} />

            </Typography>

        </Container>
    )
}
