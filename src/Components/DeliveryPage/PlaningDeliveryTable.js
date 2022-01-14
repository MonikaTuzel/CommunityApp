import React,  {useState, useEffect} from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {variables} from '../../Variables';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import {DataGrid} from '@mui/x-data-grid';
import PopupDeliveryInfo from './PopupDeliveryInfo';

const useStyles = makeStyles({
 
    contc: {
        width: 'auto',
        minWidth: '500px',
        height: '300px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems:'center',
        borderRadius: '15px',
    },
    autocom:{        
        display: "flex",
        justifyContent: 'space-around',
        textAlign: 'center',    
        width: 'auto',
        minWidth: '470px',
        height: '220px',
        borderRadius: '15px',
    }
})

export default function Contacts() {
    const classes = useStyles()
    const [future, setFuture] = useState([])
    const [openPopupDelivery, setOpenPopupDelivery] = useState(false)

    
    useEffect(() => {
       fetch(variables.API_URL_DELIVERY_BROWSE + "/future")
       .then((data) => data.json())
       .then((data) => setFuture(data))
    })
   
    const columns = [
        { field: 'deliveryDate', headerName: 'Data', width: 150},
        { field: 'userName', headerName: 'Nazwa', width: 150},
        { field: 'studentScore', headerName: 'Ilość', width: 80},
        {
          field: 'actions',
          type: 'actions',
          width: 30,
          headerName: 'I',
          cellClassName: 'actions',
          getActions: () => {
            return [
              <GridActionsCellItem
                icon={<InfoOutlinedIcon />}
                label="Info"
                onClick={() => setOpenPopupDelivery(future)}
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
                     sx={{border: 1,
                         borderRadius: '15px',
                         borderColor: '#7986cb',
                         boxShadow: 5,
                         background: '#5c6bc0',
                         width: "80%",
                         }}>
                    Planowane dostawy
                </Typography>

                <Typography className={classes.autocom} sx={{ boxShadow: 3 }}>
                    <DataGrid
                        rows={future}
                        columns={columns}                       
                    />
                </Typography>

                <PopupDeliveryInfo
                    userName={future.userName}
                    studentScore={future.studentScore}
                    deliveryDate={future.deliveryDate}
                    year={future.year}
                    semestr={future.semestr}
                    week={future.week}
                    description={future.description}
                    updateDate={future.updateDate}
                    openPopupDelivery={future.openPopupDelivery}
                    setOpenPopupDelivery={future.setOpenPopupDelivery}

                    openPopupDelivery={openPopupDelivery}
                    setOpenPopupDelivery={setOpenPopupDelivery}>
                </PopupDeliveryInfo>
        
            </Typography>

        </Container>
    )
}
