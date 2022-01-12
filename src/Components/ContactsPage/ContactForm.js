import React,  {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import {variables} from '../../Variables';
import { shadows } from '@mui/system';


const useStyles = makeStyles({
 
    contc: {
        width: '350px',
        height: '500px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        border: 1,
        borderRadius: '15px',
        borderColor: '#7986cb',
    },
    autocom:{        
        display: "flex",
        justifyContent: 'space-around',
        textAlign: 'center',    
    }
})

export default function Contacts() {
    const classes = useStyles()
    const [tableDataUsers, setTableDataUsers] = useState([])
    
    useEffect(() => {
       fetch(variables.API_URL_USERS)
       .then((data) => data.json())
       .then((data) => setTableDataUsers(data))
    })
   
    return (
        <Container sx={{ padding: 3 }}  >
                   
            <Typography className={classes.contc} p={1}
            sx={{ boxShadow: 3 }}  >

                <Typography
                    variant='h5'
                    color='textSecondary'
                    component='h2'
                    align="center"
                    gutterBottom>
                    Wyślij wiadomość
                </Typography>

                <Typography className={classes.autocom}>
                    <Autocomplete
                        id="clear-on-escape"
                        clearOnEscape
                        options={tableDataUsers}
                        getOptionLabel={(option) => option.fullName}
                        sx={{ width: 280}}
                        renderInput={(params) => <TextField
                            helperText="Wybierz użytkownika z listy"
                            {...params} label="Nadawca" variant="standard" />} />
                </Typography>
                <Typography>
                    <TextField
                        sx={{ m: 1, width: '280px' }}
                        label="Temat wiadomości"
                        multiline
                        rows={2}
                        placeholder='Temat'
                        variant="standard"
                        color='secondary'                                         
                        />
                </Typography>
                <Typography >
                    <TextField
                        sx={{ m: 1, width: '280px' }}
                        multiline
                        rows={4}
                        label="Wiadomość..."
                        helperText="Proszę wpisać treść wiadomości"
                        variant="outlined"
                    />
                </Typography>

                <Typography sx={{
                    display: "flex",
                    justifyContent:'flex-end'
                }}>                    
                    <Button
                        sx={{ width: '120px', height: '40px' }}
                        type="submit" color="secondary" variant="contained"
                        >Wyślij</Button>
                </Typography>

            </Typography>

        </Container>
    )
}