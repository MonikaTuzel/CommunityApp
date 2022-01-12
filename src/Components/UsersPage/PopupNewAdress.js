import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';
import {variables} from '../../Variables';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import PopupNewTown from './PopupNewTown';

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
    autocom:{        
        display: "flex",
        justifyContent: 'space-around',
        textAlign: 'center', 
        width: '350px'
    }    
})

export default function PopupMessage(props) {
    const classes = useStyles()
    const { openAdressPopup, setOpenAdressPopup } = props;
    const [dataTown, setDataTown] = useState([])
    const [openPopupTown, setOpenPopupTown] = useState(false)

    
    useEffect(() => {
       fetch(variables.API_URL_TOWNS)
       .then((data) => data.json())
       .then((data) => setDataTown(data))
    })

    const handleClose = () => {
        setOpenAdressPopup(false);
    };

    return (
        <Dialog open={openAdressPopup}
            fullWidth
            maxWidth="md"
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
                marginBottom:7,
            }}>
                <div>
                    <h2> Dodaj adres nowego użytkownika </h2>
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
                            sx={{ m: 1, width: '320px' }}
                            label="Nazwa ulicy"
                            placeholder='Skrócona nazwa szkoły'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EditRoadOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />


                        <TextField
                            sx={{ m: 1, mt:2, width: '150px' }}
                            label="Numer budynku"
                            placeholder='Ilość uczniów'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <TextField
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

                    </Typography>

                    <Typography>

                        <Typography className={classes.autocom}>
                            <Autocomplete
                                id="clear-on-escape"
                                clearOnEscape
                                options={dataTown}
                                getOptionLabel={(option) => option.name}
                                noOptionsText="Dodaj nowe miasto"
                                sx={{ ml: 1, mb: 1, width: 320 }}
                                renderInput={(params) => <TextField
                                    helperText="Wybierz nazwę miasta z listy"
                                    {...params} label="Nazwa miasta" variant="standard" />} />
                            <AddCircleOutlinedIcon
                                sx={{ width: '90px', height: '35px', mt: 3 }}
                                type="submit" color="secondary" variant="contained"
                                onClick={() => setOpenPopupTown(true)}/>                                
                        </Typography>                        

                        <TextField
                            sx={{ m: 1, width: '350px' }}
                            label="Nazwa użytkownika"
                            placeholder='Nazwa użytkownika'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />


                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px', mt:2 }}
                                type="submit" color="secondary" variant="contained"
                                onClick={handleClose}
                                onClick={() => setOpenAdressPopup(true)}
                            >Akceptuj</Button>
                        </Typography>

                    </Typography>

                </Typography>
                <PopupNewTown
                    openPopupTown={openPopupTown}
                    setOpenPopupTown={setOpenPopupTown}>
                </PopupNewTown>

            </DialogContent>


        </Dialog>


    )
}