import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles({

    contc: {
        width: '800px',
        height: '500px',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '15px',
        flexWrap:"wrap",

    },
    info: {
        width: '100%',
        height: 'auto',
        display: "flex",
    },
    account: {
        width: '80%',
        height: 'auto',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        flexWrap:"wrap"
    }
})

export default function Contacts() {
    const classes = useStyles()

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleChangePass = (prop) => (event) => {
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
        <Container sx={{ padding: 2 }}  >

            <Typography className={classes.contc} p={1}
                sx={{ boxShadow: 5, border: 2, borderColor: '#689f38' }}  >

                <Typography className={classes.info}>

                    <Typography className={classes.account} sx={{ borderRight: 2, borderColor: '#c5cae9' }}>

                        <Avatar alt="szkola" src="Kleks_logo.png" sx={{ width: 200, height: 180, m: 3 }} />
                        <h3>Witaj w CommunityApp</h3>

                    </Typography>

                    <Typography sx={{ m: 3, width: '95%', height: 'auto'}} >
                        <Typography sx={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h2>Zaloguj się</h2>
                            <p>Podaj swój andres email oraz hasło</p>
                        </Typography>

                        <Typography sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>

                            <TextField
                                sx={{ m: 1, mt: 2, width: '350px' }}
                                label="E-mail"
                                placeholder='E-mail'
                                color='secondary'
                                id="email"
                            />

                        <TextField
                            id="currentPassword"

                            sx={{ m: 1, width: '350px' }}
                            label="Hasło"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChangePass('password')}
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

                        </Typography>

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '150px', height: '40px', mt: 2 }}
                                type="submit" color="secondary" variant="contained"
                            //onClick={login}
                            //disabled={!validateForm()}
                            >Zaloguj</Button>
                        </Typography>

                    </Typography>

                </Typography>

            </Typography>

        </Container>
    )
}
