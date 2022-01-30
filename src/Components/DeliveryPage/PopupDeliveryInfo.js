import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';


const useStyles = makeStyles({
 
    contc: {
        width: 'auto',
        height: 'auto',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'flex-start',
        border: 1,
        borderRadius: '15px',
        borderColor: '#7986cb',
    },
    tekstbox:{
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'flex-start',
    }
})

export default function PopupDeliveryInfo(props) {
    const classes = useStyles()
    const {openPopupDelivery, setOpenPopupDelivery, delivery} = props;
    const [statusDelivery, setStatusDelivery] = useState()

    
    const handleClose = () => {
        setOpenPopupDelivery(false);
      };

      const setChangeStatus = async (id) => {       
            const options = {
                method: 'PUT',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json'
                }
             };             
             fetch(variables.API_URL_DELIVERY +`/${id}`, options)
        
      }      
    return(
        <Dialog open={openPopupDelivery}
        fullWidth
        maxWidth="sm">
            <Button
                sx={{ width: '90px', height: '35px' }}
                type="submit" color="error" variant="contained"
                onClick={handleClose}>
                    Anuluj
            </Button>

            <DialogTitle style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <div>
                    <h2> Szczegóły dostawy</h2>
                </div>
            </DialogTitle>
            <DialogContent sx={{
                display: "flex",
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <Typography
                    className={classes.contc}                   
                    p={1}
                    sx={{ boxShadow: 3 }}  >
                    
                    <Typography>
                        <p>Nazwa użytkownika: {delivery?.userName}</p>
                        <p>Ilość uczniów: {delivery?.studentScore} </p>
                        <p>Termin dostawy: {delivery?.deliveryDate} </p>
                        <p>Rok szkolny: {delivery?.year} </p>
                        <p>Semestr: {delivery?.semestr} </p>
                        <p>Tydzień: {delivery?.week} </p>
                        <p>Opis: {delivery?.description} </p>
                        <p>Ostatnia aktualizacja: {delivery?.updateDate} </p>
                        <p>Status: {delivery?.statusName} </p>
                    </Typography>
                   

                    <Typography sx={{
                        display: "flex",
                        justifyContent: 'flex-end'
                    }}>
                        <Button
                            sx={{ width: '130px', height: '30px' }}
                            type="submit" color="secondary" variant="contained"   
                            disabled={delivery?.statusName == "Zrealizowano"}
                            onClick={async () => { 
                                await setChangeStatus(delivery?.id).then(()=>{
                                    handleClose()
                                })}}
                        >
                            Zrealizowano
                        </Button>

                    </Typography>

                    </Typography>
                </DialogContent>
        </Dialog>


    )
}