import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Button from '@mui/material/Button';
import PopupMessage from './PopupMessage';
import { variables } from '../../Variables';

export default function Popup(props) {

    const {openPopup, setOpenPopup, message} = props;
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
                    Zamknij
            </Button>

            <DialogTitle>                                    
                <div>            
                    <h3> Wiadomość od użytkownika:  {message?.senderName} </h3>
                    <h4>Temat: {message?.topic} </h4>
                    <h6>Data nadania: {message?.date} </h6>
                </div>
            </DialogTitle>

            <DialogContent>
              {message?.contents}
            </DialogContent>

            <DialogActions>                     
                <Button                 
                    sx={{ width: '150px', height: '35px' }}
                    color="secondary" 
                    variant="outlined" 
                    startIcon={<QuestionAnswerOutlinedIcon />}
                    onClick={async () => {
                        await setOpenPopupMess(message).then(() => {
                            handleClose();
                        })                                                 
                      }}
                    >
                        Odpowiedz
                </Button>

                <Button                 
                    sx={{ width: '150px', height: '35px' }}
                    color="secondary" 
                    variant="outlined" 
                    startIcon={<DeleteOutlinedIcon />}>
                        Usuń
                </Button>           
                       
            </DialogActions>

            <PopupMessage
                userName={message?.senderName}
                topic = {message?.topic}
                content = {message?.content}
                openPopupMess={openPopupMess}
                setOpenPopupMess={setOpenPopupMess}
            >
            </PopupMessage>

        </Dialog>
        

    )

}

