import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';


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
    const {date, messageId, userName, topic, content, openPopupMess, setOpenPopupMess} = props;
    const [message, setMessage] = useState({
        messageId:messageId, senderName:"Szkola Podstawowa nr 12", topic, content
    })
    
    const handleClose = () => {
        setOpenPopupMess(false);
      };

      function refreshPage() {
        window.location.reload();
    }

      const handleChange = (event, newValue) => {

        let name = event.target.id;

        if (name.includes('clear-on-escape-option') ) name = 'userId'
     

        setMessage({

            ...message,

            [name]: newValue?.id ?? event.target.value,

        });

    };
        //console.log(message, "odpowiedz")

    const send = async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(variables.API_URL_MESSAGE_REPLY, options).then(refreshPage)

    }

    return(
        <Dialog open={openPopupMess}>
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
                    <h2> Odpowiedz na wiadomo???? od u??ytkownika:  {userName} </h2>
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
                                id="topic"
                                value={"Re: "+ topic}   
                                sx={{ m: 1, width: '500px' }}                                                                                
                                label="Temat wiadomo??ci"
                                multiline
                                rows={2}
                                color='secondary' 
                                onChange={handleChange}
                                />
                        </Typography>
                        <Typography >
                            <TextField
                             id="contents"
                             value={message?.contents}
                                sx={{ m: 1, width: '500px' }}
                                multiline
                                rows={5}
                                label="Wiadomo????..."
                                defaultValue= {"\n------\nDnia: " + date + ",U??ytkownik "+ userName + " napisa??: " + content}
                                onChange={handleChange}
    
                            />
                        </Typography>

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px' }}
                                type="submit" color="secondary" variant="contained"
                                onClick={send}
                                >Wy??lij</Button>
                        </Typography>

                    </Typography>
                </div>
                </DialogContent>
        </Dialog>


    )
}