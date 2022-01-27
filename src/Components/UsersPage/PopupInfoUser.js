import { Dialog, DialogContent, DialogTitle} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import {  Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

    contc: {
        width: '800px',
        height: 'auto',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        border: 1,
        borderRadius: '15px',
        borderColor: '#7986cb',
    }
})

export default function PopupMessage(props) {
    const classes = useStyles()
    const {openPoupInfoUser, setOpenPoupInfoUser, user, dataTown} = props;

    const handleClose = async () => {
        setOpenPoupInfoUser(false);
    };

    return (
        <Dialog open={openPoupInfoUser}
            fullWidth
            maxWidth="sm"
        >
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
                marginBottom: 7,
            }}>
                <div>
                    <h2> Szczegóły użytkownika </h2>
                </div>
            </DialogTitle>

            <DialogContent sx={{
                display: "flex",
                justifyContent: 'center'
            }}>

                <Typography
                    className={classes.contc}
                    p={5}
                    sx={{ boxShadow: 3 }}  >

                    <Typography>
                       
                        <h6>Id użytkownika: {user?.id}</h6>
                        <h6>Nazwa użytkownika: {user?.fullName}</h6>
                        <h6>Ilość uczniów: {user?.studentScore} </h6> 
                        <h6>Ilość uczniów: {dataTown?.townName} </h6> 

                    </Typography>

                </Typography>
                    
            </DialogContent>

        </Dialog>
    );                         

} 