import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
 
    contc: {
        width: '550px',
        height: '300px',
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
    const {userName, studentScore, deliveryDate, year, semestr, week, 
        description, updateDate, openPopupDelivery, setOpenPopupDelivery} = props;
    
    const handleClose = () => {
        setOpenPopupDelivery(false);
      };

    return(
        <Dialog open={openPopupDelivery}>
            <Button
                sx={{ width: '90px', height: '35px' }}
                type="submit" color="secondary" variant="contained"
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
                    <h2> Szczegóły dostawy </h2>
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
                        <h6>Nazwa użytkownika: {userName}</h6>
                        <h6>Ilość uczniów: {studentScore} </h6>
                        <h6>Termin dostawy: {deliveryDate} </h6>
                        <h6>Rok szkolny: {year} </h6>
                        <h6>Semestr: {semestr} </h6>
                        <h6>Tydzień: {week} </h6>
                        <h6>Opis: {description} </h6>
                        <h6>Ostatnia aktualizacja: {updateDate} </h6>
                    </Typography>
                   

                    <Typography sx={{
                        display: "flex",
                        justifyContent: 'flex-end'
                    }}>
                        <Button
                            sx={{ width: '130px', height: '30px' }}
                            type="submit" color="secondary" variant="contained">Zrealizowano</Button>
                    </Typography>

                    </Typography>
                </DialogContent>
        </Dialog>


    )
}