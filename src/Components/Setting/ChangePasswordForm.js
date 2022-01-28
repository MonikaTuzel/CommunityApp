import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles({

    contc: {
        width: 'auto',
        height: 'auto',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '15px',
    },
    info: {
        width: '100%',
        height: 'auto',
        display: "flex",
        flexDirection: 'column',
    },
})

export default function Contacts() {
    const classes = useStyles()
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(variables.API_URL_DELIVERY_BROWSE)
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, []);

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
        <Container sx={{ padding: 0 }}  >

            <Typography className={classes.contc} p={1}
                sx={{ boxShadow: 10, border: 2, borderColor: '#c5cae9' }}  >

                <Typography sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', borderBottom: 2, borderColor: '#c5cae9' }}>
                    <h2>Zmień hasło</h2>
                    <p>Potwierdź stare hasło i wprowadź nowe</p>
                </Typography>

                <Typography className={classes.info}>

                    <Typography sx={{ m:3}}>
                        <TextField
                            id="currentPassword"

                            sx={{ m: 1, width: '350px' }}
                            label="Aktualne hasło"
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

                    <Typography sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                        <Typography>

                            <TextField
                                id="newPassword"

                                sx={{ m: 1, width: '350px' }}
                                label="Nowe hasło"
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

                            <TextField
                                id="confirmNewPassword"

                                sx={{ m: 1, width: '350px' }}
                                label="Powtórz nowe hasło"
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
                    </Typography>

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '150px', height: '40px', mt: 2 }}
                                type="submit" color="secondary" variant="contained"
                            //onClick={updateUser}
                            //disabled={!validateForm()}
                            >Zmień</Button>
                        </Typography>

                </Typography>

            </Typography>


        </Container>
    )
}
