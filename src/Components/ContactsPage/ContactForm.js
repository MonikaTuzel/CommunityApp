import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { variables } from '../../Variables';


const useStyles = makeStyles({

    contc: {
        width: '350px',
        height: '500px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '15px',
    },
    autocom: {
        display: "flex",
        justifyContent: 'space-around',
        textAlign: 'center',
    }
})

export default function Contacts() {
    const classes = useStyles()
    const [tableDataUsers, setTableDataUsers] = useState([])
    const [value, setValue] = React.useState(tableDataUsers[0]);
    const [message, setMessage] = useState({
        senderId: '3010'
    })


    function validateForm() {

        return message.userId && message.topic&&message.contents;
    
      }

    useEffect(() => {
        fetch(variables.API_URL_USERS)
            .then((data) => data.json())
            .then((data) => setTableDataUsers(data))
    }, []);

    const handleChange = (event, newValue) => {

        let name = event.target.id;

        if (name.includes('clear-on-escape-option') ) name = 'userId'
     

        setMessage({

            ...message,

            [name]: newValue?.id ?? event.target.value,

        });

    };

    const send = async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(variables.API_URL_MESSAGE_SEND, options).then(()=>{
            setMessage({userId:message.userId})
        });
    }

    console.log(message, "newMessage")

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
                        border: 1,
                        borderRadius: '15px',
                        borderColor: '#7986cb',
                        boxShadow: 5,
                        background: '#5c6bc0',
                        width: "80%",
                    }}>
                    Wyślij wiadomość
                </Typography>

                <Typography className={classes.autocom}>
                    <Autocomplete
                        value={value}
                        // inputValue={message.userId}
                    
                        id="clear-on-escape"
                        clearOnEscape
                        options={tableDataUsers}
                        getOptionLabel={(option) => option.fullName}
                        sx={{ width: 280 }}
                        onChange={handleChange}
                        renderInput={(params) => <TextField
                            helperText="Wybierz użytkownika z listy"
                            {...params} label="Nadawca" variant="standard" />} />
                </Typography>
                <Typography>
                    <TextField
                        id="topic"
                        value={message?.topic??""}
                     
                        sx={{ m: 1, width: '280px' }}
                        label="Temat wiadomości"
                        multiline
                        rows={2}
                        placeholder='Temat'
                        variant="standard"
                        color='secondary'
                        onChange={handleChange}
                    />
                </Typography>
                <Typography >
                    <TextField
                        id="contents"
                        value={message?.contents??""}
                  
                        sx={{ m: 1, width: '280px' }}
                        multiline
                        rows={4}
                        label="Wiadomość..."
                        helperText="Proszę wpisać treść wiadomości"
                        variant="outlined"
                 
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
                        disabled={!validateForm()}
                    >Wyślij</Button>
                </Typography>

            </Typography>

        </Container>
    )
}
