import React from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';


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
        border: "2px double",
    }
})

export default function Contacts() {
    const classes = useStyles()

    return (
        <Container>
           
            <Typography className={classes.contc} p={1}  >

                <Typography
                    variant='h5'
                    color='textSecondary'
                    component='h2'
                    align="center"
                    gutterBottom>
                    Twoje wiadomości
                </Typography>

                <Typography>
                    <TextField
                        sx={{ m: 1, width: '280px' }}
                        label="Temat wiadomości"
                        multiline
                        maxRows={2}
                        placeholder='Temat'
                        variant="standard"
                        color='secondary' />
                </Typography>
                <Typography >
                    <TextField
                        sx={{ m: 1, width: '280px' }}
                        multiline
                        rows={4}
                        maxRows={4}
                        label="Wiadomość..."
                        helperText="Proszę wpisać treść wiadomości"
                        variant="outlined"
                    />
                </Typography>


                <Typography sx={{
                    display: "flex",
                    flexDirection: 'row',
                }}>
                    <Typography px={5}>
                        <TextField
                            sx={{ width: '120px' }}
                            //disabled 
                            label="ID użytkownika"
                            placeholder='1001'
                            variant="standard"
                            color='secondary' />
                    </Typography>
                    <Button
                        sx={{ width: '120px', height: '40px' }}
                        type="submit" color="secondary" variant="contained">Wyślij</Button>
                </Typography>

            </Typography>

        </Container>
    )
}
