import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';
import { variables } from '../../Variables';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const useStyles = makeStyles({

    contc: {
        width: '500px',
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
    const { topic, content, openPopupTown, setOpenPopupTown } = props;

    const handleClose = () => {
        setOpenPopupTown(false);
    };

    return (
        <Dialog open={openPopupTown}
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
            }}>
                <div>
                    <h2> Dodaj nowe miasto </h2>
                </div>
            </DialogTitle>

            <DialogContent sx={{
                display: "flex",
                justifyContent: 'center'
            }}>

                <Typography
                    className={classes.contc}
                    p={3}
                    sx={{ boxShadow: 3 }}  >

                    <Typography>

                        <TextField
                            sx={{ m: 1, width: '200px' }}
                            label="Nazwa miasta"
                            placeholder='Skrócona nazwa szkoły'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ModeEditOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <TextField
                            sx={{ m: 1, width: '200px' }}
                            label="Województwo"
                            placeholder='Skrócona nazwa szkoły'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ModeEditOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />


                    </Typography>

                    <Typography>

                        <TextField
                            sx={{ m: 1, width: '200px' }}
                            label="Powiat"
                            placeholder='Skrócona nazwa szkoły'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ModeEditOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <TextField
                            sx={{ m: 1, width: '200px' }}
                            label="Gmina"
                            placeholder='Skrócona nazwa szkoły'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ModeEditOutlineOutlinedIcon />
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
                                onClick={handleClose}
                            >Akceptuj</Button>
                        </Typography>
                    </Typography>


                </Typography>

            </DialogContent>


        </Dialog>


    )
}