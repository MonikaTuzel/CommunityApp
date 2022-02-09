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
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import {variables} from '../../Variables';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';


const useStyles = makeStyles({

    contc: {
        width: 'auto',
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
    const { openPopup, setOpenPopup} = props;
    const [dataTown, setDataTown] = useState([])
    const [user, setNewUser] = useState();
    const [value, setValue] = useState(dataTown[0]);


    const handleClose = () => {
        setOpenPopup(false);
    };

    useEffect(() => {
        fetch(variables.API_URL_TOWNS)
        .then((data) => data.json())
        .then((data) => setDataTown(data))
    }, []);

    const [values, setValues] = useState({
        password: '',
        showPassword: false,

        fullName:'',
        shortName: '',
        studentScore: '',
        street: '',
        number: '',
        code: '',
        phone:'',
        email: '',      
        townId:'',
        
    });

    const handleChangePass = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values.password, "hasło")
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    // function validateForm() {

    //     return user.fullName && user.shortName && user.studentScore && user.street && user.number && user.code && user.phone && user.email && user.password  
    
    // }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event, newValue) => {

        let name = event.target.id;

        if (name.includes('clear-on-escape-option') ) name = 'townId'
     

        setNewUser({

            ...user,

            [name]: newValue ?? event.target.value,

        });

        values.townId = 'townId'

    };
    console.log(user, "newUser")

    const save = async () => {
        const registy = {
            fullName: values.fullName,
            shortName: values.shortName,
            studentScore: values.studentScore,
            street: values.street,
            number: values.number,
            code: values.code,
            phone: values.phone,
            email: values.email,    
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(registy),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(variables.API_URL_USERS_REGISTER, options).then(()=>{
            setNewUser()
        });

        console.log(user, "nowyUser")

    };    

    return (
        <Dialog open={openPopup}
            fullWidth
            maxWidth="lg"
        >
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
                    <h1> Dodaj nową szkołę </h1>
                </div>
            </DialogTitle>

            <DialogContent sx={{
                display: "flex",
                justifyContent: 'center'
            }}>


                <Typography
                    className={classes.contc}
                    p={2}
                    sx={{ boxShadow: 3 }}  >

                    <Typography>

                        <TextField
                        id="fullName"
                        // value={user?.fullName??""}
                        value={values.fullName}
                        onChange={handleChangePass('fullName')}

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
                        id="shortName"
                        //value={user?.shortName??""}
                        value={values.shortName}

                        onChange={handleChangePass('shortName')}

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
                        id="studentScore"
                        //value={user?.studentScore??""}
                        value={values.studentScore}

                        onChange={handleChangePass('studentScore')}

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
                    id="street"
                    //value={user?.street??""}
                    value={values.street}

                    onChange={handleChangePass('street')}

                            sx={{ m: 1, width: '320px' }}
                            label="Nazwa ulicy"
                            placeholder='Nazwa ulicy'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EditRoadOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />


                        <TextField
                        id="number"
                        //value={user?.number??""}
                        value={values.number}

                        onChange={handleChangePass('number')}

                            sx={{ m: 1, mt:2, width: '150px' }}
                            label="Numer budynku"
                            placeholder='Numer budynku'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <TextField
                        id="code"
                        //value={user?.code??""}
                        value={values.code}

                        onChange={handleChangePass('code')}

                            sx={{ m: 1, mt:2, width: '150px' }}
                            label="Kod pocztowy"
                            placeholder='Kod pocztowy'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />
                            <Typography className={classes.autocom}>
                            <Autocomplete
                            value={values.code}

                            onChange={handleChangePass('code')}

                                id="clear-on-escape"
                                clearOnEscape
                                options={dataTown}
                                getOptionLabel={(option) => option.name}
                                noOptionsText="Dodaj nowe miasto"
                                sx={{ ml: 1, mb: 1, width: 320 }}
                                renderInput={(params) => <TextField
                                    helperText="Wybierz nazwę miasta z listy"
                                    {...params} label="Nazwa miasta" variant="standard" />} />                                                
                        </Typography>    
                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'center'
                        }} mt={5}>
                            <Button
                                sx={{ width: '120px', height: '40px' }}
                                type="submit" color="secondary" variant="contained"
                                //disabled = {!validateForm()}
                                onClick={save}

                            >Utwórz</Button>
                        </Typography>         
                    </Typography>

                    <Typography ml={2}>

                        <TextField
                        id="phone"
                        //value={user?.phone??""}
                        value={values.phone}

                        onChange={handleChangePass('phone')}

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
                        id="email"
                        //value={user?.email??""}
                        value={values.email}

                        onChange={handleChangePass('email')}
                        
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
                        id="password"
                        value={values.password}
                        
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
                  

                </Typography>                

            </DialogContent>

            <DialogActions>

            </DialogActions>
        </Dialog>


    )

}

