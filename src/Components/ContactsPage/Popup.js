import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Button from '@mui/material/Button';
import PopupMessage from './PopupMessage';

export default function Popup(props) {

    const {title, nazwa, date, messageId, children, openPopup, setOpenPopup} = props;
    const [tableDataDetails, setTableDataDetails] = useState([])
    const [openPopupMess, setOpenPopupMess] = useState(false)

    const handleClose = () => {
        setOpenPopup(false);
      };

    useEffect(() => {
        fetch('https://localhost:5021/message/read/2')
            .then((data) => data.json())
            .then((data) => setTableDataDetails(data))
            .then(response => console.log(response))
    })
    useEffect(() => {
        setTableDataDetails(tableDataDetails);
    }, [tableDataDetails]);
    
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
                    <h2> Wiadomość od użytkownika: {tableDataDetails.senderName} </h2>
                    <h6>Data wysłania wiadomości: {date} </h6>
                    <h6>Numer wiadomości: {messageId} </h6>

                </div>
            </DialogTitle>

            <DialogContent>
                {tableDataDetails.content}
            </DialogContent>

            <DialogActions>                     
                <Button                 
                    sx={{ width: '150px', height: '35px' }}
                    color="secondary" 
                    variant="outlined" 
                    startIcon={<QuestionAnswerOutlinedIcon />}
                    onClick = {handleClose} 
                    onClick={() => setOpenPopupMess(tableDataDetails)}
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
                userName={tableDataDetails.senderName}
                topic = {tableDataDetails.topic}
                content = {tableDataDetails.content}
                openPopupMess={openPopupMess}
                setOpenPopupMess={setOpenPopupMess}
            >
            </PopupMessage>

        </Dialog>
        

    )

}

