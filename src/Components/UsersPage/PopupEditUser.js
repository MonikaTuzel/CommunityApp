import { Dialog, DialogContent, DialogTitle} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { variables } from '../../Variables';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';


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
    },
    autocom: {
        display: "flex",
        justifyContent: 'space-around',
        textAlign: 'center',
        width: '350px'
    }
})

export default function PopupMessage(props) {
    const classes = useStyles()
    const { openPopupEditUser, setOpenPopupEditUser, user } = props;
    const [newUser, setNewUser] = useState();


    useEffect(() => {
        if (user)
            setNewUser(user);
    }, [user]);

    const handleChange = (event) => {

        const name = event.target.id;

        setNewUser({

            ...newUser,

            [name]: event.target.value,

        });

    };

    const handleClose = async () => {
        setOpenPopupEditUser(false);
    };

    const updateUser = async () => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
         };
         
         fetch(variables.API_URL_USERS +`/${newUser.id}`, options)
           .then( setOpenPopupEditUser(false))
    
       ;
    }

    //console.log(newUser, "user")

    return (
        <Dialog open={openPopupEditUser}
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
                    <h2> Edytuj dane użytkownika </h2>
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

                        <TextField
                            disabled
                            sx={{ m: 1, width: '200px' }}
                            label="ID"
                            placeholder='ID'
                            color='secondary'
                            defaultValue="numer id"
                            value={user?.id}
                        />

                        <TextField
                            sx={{ m: 1, mt: 2, width: '200px' }}
                            label="Nazwa użytkownika"
                            placeholder='Nazwa użytkownika'
                            color='secondary'
                            defaultValue="nazwa uzytkownika"
                            value={newUser?.fullName}
                            id="fullName"
                            onChange={handleChange}
                        />

                    </Typography>

                    <Typography>

                        <TextField
                            sx={{ m: 1, mt: 2, width: '200px' }}
                            label="Ilość uczniów"
                            placeholder='Ilość uczniów'
                            defaultValue="ilość uczniów"
                            value={newUser?.studentScore}
                            id="studentScore"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <TextField
                            sx={{ m: 1, mt: 2, width: '200px' }}
                            label="Numer telefonu"
                            placeholder='Numer telefonu'
                            defaultValue="numer telefonu"
                            value={newUser?.phone}
                            id="phone"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px', mt: 2 }}
                                type="submit" color="secondary" variant="contained"
                                onClick={updateUser}
                            >Akceptuj</Button>
                        </Typography>

                    </Typography>

                </Typography>

            </DialogContent>


        </Dialog>


    )
}