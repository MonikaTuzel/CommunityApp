import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import {DataGrid} from '@mui/x-data-grid';
import PopupDeliveryInfo from './PopupDeliveryInfo';
import PopupAddDelivery from './PopupAddDelivery';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const useStyles = makeStyles({

    contc: {
        width: 'auto',
        height: '500px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '15px',
    },
    autocom: {
        display: "flex",
        justifyContent: 'space-around',
        textAlign: 'center',
        width: 'auto',
        minWidth: '1000px',
        height: '430px',
        borderRadius: '15px',
    }
})

export default function Contacts() {
    const classes = useStyles()
    const [delivery, setDelivery] = useState([])
    const [openPopupDelivery, setOpenPopupDelivery] = useState(false)
    const [openPopupAddDelivery, setOpenPopupAddDelivery] = useState(false)



    useEffect(() => {
        fetch(variables.API_URL_DELIVERY_BROWSE)
            .then((data) => data.json())
            .then((data) => setDelivery(data))
    })

    const columns = [
        { field: 'deliveryDate', headerName: 'Data', width: 180 },
        { field: 'year', headerName: 'Rok', width: 150 },
        { field: 'userName', headerName: 'Nazwa', width: 180 },
        { field: 'studentScore', headerName: 'Ilość', width: 80 },
        { field: 'description', headerName: 'Opis', width: 180 },
        { field: 'statusName', headerName: 'Status', width: 150 },      
        {
            field: 'actions',
            type: 'actions',
            width: 60,
            headerName: 'Info',
            cellClassName: 'actions',
            getActions: () => {
                return [
                    <GridActionsCellItem
                        icon={<InfoOutlinedIcon />}
                        label="Info"
                        onClick={() => setOpenPopupDelivery(delivery)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Container sx={{ padding: 3 }}  >

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
                    Wszystkie dostawy
                    <Button>
                        <AddCircleOutlineOutlinedIcon onClick={() => setOpenPopupAddDelivery(true)} />                    
                    </Button>
                    
                </Typography>

                <Typography className={classes.autocom} sx={{ boxShadow: 3 }}>
                    <DataGrid
                        rows={delivery}
                        columns={columns}
                    />
                </Typography>

                <PopupDeliveryInfo
                    userName={delivery.userName}
                    studentScore={delivery.studentScore}
                    deliveryDate={delivery.deliveryDate}
                    year={delivery.year}
                    semestr={delivery.semestr}
                    week={delivery.week}
                    description={delivery.description}
                    updateDate={delivery.updateDate}
                    openPopupDelivery={delivery.openPopupDelivery}
                    setOpenPopupDelivery={delivery.setOpenPopupDelivery}

                    openPopupDelivery={openPopupDelivery}
                    setOpenPopupDelivery={setOpenPopupDelivery}>
                </PopupDeliveryInfo>

                <PopupAddDelivery openPopupAddDelivery={openPopupAddDelivery}
                    setOpenPopupAddDelivery={setOpenPopupAddDelivery}  />



            </Typography>

        </Container>
    )
}
