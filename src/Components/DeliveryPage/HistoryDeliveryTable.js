import React,  {useState, useEffect} from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {variables} from '../../Variables';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import {DataGrid} from '@mui/x-data-grid';
import PopupDeliveryInfo from './PopupDeliveryInfo';
import { useLocation } from 'react-router-dom';



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

export default function HistoryDeliveryTable() {
    const [tableData, setTableData] = useState([])
    const [user, setUser] = useState([])

    const classes = useStyles()
    const [history, setHistory] = useState([])
    const [openPopupDelivery, setOpenPopupDelivery] = useState(false)
    const location = useLocation()

        useEffect(() => {       
            if(location.state.role === 'Szkola'){
                fetch(variables.API_URL_DELIVERY_HISTORY + `/${location.state.id}`)
                .then((data) => data.json())
                .then((data) => setTableData(data))
            }
            if(location.state.role === 'Admin'){
                fetch(variables.API_URL_DELIVERY_HISTORY)
                    .then((data) => data.json())
                    .then((data) => setTableData(data))
            }  
        },[]); 
    
    

    const getInfo = async (id) => {
        let element = tableData.find(el => el.id == id)
        setHistory(element)
      }    
   
    const columns = [
        { field: 'deliveryDate', headerName: 'Data', width: 150},
        { field: 'userName', headerName: 'Nazwa', width: 150},
        { field: 'studentScore', headerName: 'Ilo????', width: 80},
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
                color="inherit"
                onClick={async () => {
                    await getInfo(params.id).then(() => {
                        setOpenPopupDelivery(true);
                    })
                  }}
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
                    Historia dostaw
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
                    delivery={history}                    
                    >
                </PopupDeliveryInfo>

            </Typography>


        </Container>
    )
}
