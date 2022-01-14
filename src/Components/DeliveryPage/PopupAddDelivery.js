import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { variables } from '../../Variables';


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
        textAlign: 'flex-start',
    }
})

export default function PopupDeliveryInfo(props) {
    const classes = useStyles()
    const { openPopupAddDelivery, setOpenPopupAddDelivery } = props;
    const [tableDataUsers, setTableDataUsers] = useState([])

    useEffect(() => {
        fetch(variables.API_URL_USERS)
            .then((data) => data.json())
            .then((data) => setTableDataUsers(data))
    })

    const handleClose = () => {
        setOpenPopupAddDelivery(false);
    };

    return (
        <Dialog open={openPopupAddDelivery}
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
                    <h2> Dodaj nową dostawę </h2>
                </div>
            </DialogTitle>
            <DialogContent sx={{
                display: "flex",
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <Typography
                    className={classes.contc}
                    p={1}
                    sx={{ boxShadow: 3 }}  >

                    <Typography>

                        <Autocomplete
                            id="clear-on-escape"
                            clearOnEscape
                            options={tableDataUsers}
                            getOptionLabel={(option) => option.fullName}
                            sx={{ width: 280 }}
                            ml={5}
                            renderInput={(params) => <TextField
                                helperText="Wybierz użytkownika z listy"
                                {...params} label="Nazwa szkoły" variant="standard" />} />

                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Data dostawy"
                            placeholder='Data dostawy'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DateRangeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Uwagi"
                            placeholder='Uwagi'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />



                    </Typography>

                    <Typography>

                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Rok szkolny"
                            placeholder='Rok szkolny'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DateRangeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />
                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Semestr"
                            placeholder='Semestr'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DateRangeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Tydzień"
                            placeholder='Tydzień'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DateRangeOutlinedIcon />
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
                            >Akceptuj</Button>
                        </Typography>

                    </Typography>
                </Typography>
            </DialogContent>
        </Dialog>


    )
}