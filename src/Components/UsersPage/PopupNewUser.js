import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
 
    contc: {
        width: '550px',
        height: '300px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        border: 1,
        borderRadius: '15px',
        borderColor: '#7986cb',
    },
    tekstbox:{
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    }
})

export default function Popup(props) {
    const classes = useStyles()
    const {title, nazwa, date, messageId, children, openPopup, setOpenPopup} = props;
    const [openPopupMess, setOpenPopupMess] = useState(false)

    const handleClose = () => {
        setOpenPopup(false);
    };

    return (          
        <Dialog open={openPopup} >
            <Button
                sx={{ width: '90px', height: '35px' }}
                type="submit" color="secondary" variant="contained"
                onClick={handleClose}>
                    Anuluj
            </Button>

            <DialogTitle>                                    
                <div>            
                    <h2> Utwórz nowego użytkownika </h2>                    
                </div>
            </DialogTitle>

            <DialogContent sx={{
                display: "flex",
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <div>
                    <Typography 
                        className={classes.contc} 
                        p={1}
                        sx={{ boxShadow: 3 }}  >
                                            
                        <Typography>
                            <TextField
                                sx={{ m: 1, width: '500px' }}                                                      
                                label="Pełna nazwa szkoły"                              
                                color='secondary' />
                        </Typography>
                        <Typography>
                            <TextField
                                sx={{ m: 1, width: '500px' }}                                                      
                                label="Skrócona nazwa szkoły"                              
                                color='secondary' />
                        </Typography>
                        <Typography>
                            <TextField
                                sx={{ m: 1, width: '500px' }}                                                      
                                label="Ilość uczniów"                              
                                color='secondary' />
                        </Typography>
                        <Typography>
                            <TextField
                                sx={{ m: 1, width: '500px' }}                                                      
                                label="Telefon kontaktowy"                              
                                color='secondary' />
                        </Typography>
                        

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px' }}
                                type="submit" color="secondary" variant="contained">Akceptuj</Button>
                        </Typography>

                    </Typography>
                </div>
                </DialogContent>

            <DialogActions>                     
                       
                       
            </DialogActions>            

        </Dialog>
        

    )

}

