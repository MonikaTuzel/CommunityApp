import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Button from '@mui/material/Button';
import ContactForm from './ContactForm';
import { TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import {variables} from '../../Variables';
import { shadows } from '@mui/system';

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

export default function PopupMessage(props) {
    const classes = useStyles()
    const {userName, topic, content, openPopupMess, setOpenPopupMess} = props;
    
    const handleClose = () => {
        setOpenPopupMess(false);
      };

    return(
        <Dialog open={openPopupMess}>
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
                    <h2> Odpowiedz na wiadomość od użytkownika:  {userName} </h2>
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
                                label="Temat wiadomości"
                                multiline
                                rows={2}
                                defaultValue={"Re: "+ topic}
                                color='secondary' />
                        </Typography>
                        <Typography >
                            <TextField
                                sx={{ m: 1, width: '500px' }}
                                multiline
                                rows={4}
                                label="Wiadomość..."
                                defaultValue= {"\n------\nUżytkownik "+ userName + " napisał: " + content}
    
                            />
                        </Typography>

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px' }}
                                type="submit" color="secondary" variant="contained">Wyślij</Button>
                        </Typography>

                    </Typography>
                </div>
                </DialogContent>
        </Dialog>


    )
}