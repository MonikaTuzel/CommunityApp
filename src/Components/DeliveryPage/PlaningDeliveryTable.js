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
    const [tableData, setTableData] = useState([])
    const classes = useStyles()
    const [future, setFuture] = useState()
    const [openPopupDelivery, setOpenPopupDelivery] = useState(false)

    
    useEffect(() => {
       fetch(variables.API_URL_DELIVERY_BROWSE + "/future")
       .then((data) => data.json())
       .then((data) => setTableData(data))
      },[]);

    const getInfo = async (id) => {
        let element = tableData.find(el => el.id == id)
        setFuture(element)
        console.log(element, "elementFuture");    
      }    
   
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
          getActions: (params) => {
            return [
              <GridActionsCellItem
                icon={<InfoOutlinedIcon />}
                label="Info"
                onClick={async () => {
                    await getInfo(params.id).then(() => {
                        setOpenPopupDelivery(true);
                    })
                  }}
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
                      borderRadius: '15px',
                      boxShadow: 5,
                      background: '#689f38',
                      width: "80%",
                         }}>
                    Planowane dostawy
                </Typography>

                <Typography className={classes.autocom} sx={{ boxShadow: 3 }}>
                    <DataGrid
                        rows={tableData}
                        columns={columns}                       
                    />
                </Typography>

                <PopupDeliveryInfo                    
                    openPopupDelivery={openPopupDelivery}
                    setOpenPopupDelivery={setOpenPopupDelivery}
                    delivery={future}                    
                    >
                </PopupDeliveryInfo>
        
            </Typography>

        </Container>
    )
}
