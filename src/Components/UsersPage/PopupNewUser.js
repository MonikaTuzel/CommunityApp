import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PopNewAdress from './PopupNewAdress';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';



const useStyles = makeStyles({

    contc: {
        width: '900px',
        height: 'auto',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        border: 1,
        borderRadius: '15px',
        borderColor: '#7986cb',

    },
    tekstbox: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    }
})

export default function Popup(props) {
    const classes = useStyles()
    const { openPopup, setOpenPopup } = props;
    const [openAdressPopup, setOpenAdressPopup] = useState(false)

    const handleClose = () => {
        setOpenPopup(false);
    };

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Dialog open={openPopup}
            fullWidth
            maxWidth="lg"
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
            }}>
                <div>
                    <h1> Dodaj nową szkołę </h1>
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
                            sx={{ m: 1, width: '350px' }}
                            label="Pełna nazwa szkoły"
                            placeholder='Pełna nazwa szkoły'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />
                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Skrócona nazwa szkoły"
                            placeholder='Skrócona nazwa szkoły'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />
                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Ilość uczniów"
                            placeholder='Ilość uczniów'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PeopleOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                    </Typography>

                    <Typography>

                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Telefon kontaktowy"
                            placeholder='Telefon kontaktowy'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />
                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Adres e-mail"
                            placeholder='Adres e-mail'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />
                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Hasło"
                            defaultValue="hasloTymczasowe$!"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px' }}
                                type="submit" color="secondary" variant="contained"
                                onClick={handleClose}
                                onClick={() => setOpenAdressPopup(true)}
                            >Akceptuj</Button>
                        </Typography>

                    </Typography>

                </Typography>

                <PopNewAdress
                    openAdressPopup={openAdressPopup}
                    setOpenAdressPopup={setOpenAdressPopup}>
                </PopNewAdress>

            </DialogContent>

            <DialogActions>

            </DialogActions>

        </Dialog>


    )

}

