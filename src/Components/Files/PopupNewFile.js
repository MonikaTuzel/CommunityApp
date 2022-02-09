import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { variables } from '../../Variables';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';

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

export default function PopupNewFile(props) {
    const classes = useStyles()
    const { openPopupFile, setOpenPopupFile } = props;
    const [file, setNewFile] = useState();
    const [tableDataUsers, setTableDataUsers] = useState([])
    const [valueUser, setValueUser] = useState(tableDataUsers[0]);

    // function validateForm() {
    //     return town.name && town.province && town.district && town.commune;    
    //   }

    const Input = styled('input')({
        display: 'none',
    });

    const handleClose = () => {
        setOpenPopupFile(false);
    };

    useEffect(() => {
        fetch(variables.API_URL_USERS)
            .then((data) => data.json())
            .then((data) => setTableDataUsers(data))
        }, []);

    const handleChange = (event, newValue) => {

        let name = event.target.id;

        if (name.includes('clear-on-escape-option')) name = 'fileId'

        setNewFile({

            ...file,

            [name]: newValue ?? event.target.value,

        });
        console.log(file, "newFile")

    };

    const save = async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(file),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(variables.API_URL_DOCUMENTS_NEWUPLOAD, options).then(() => {
            setNewFile()
        });

    };

    return (
        <Dialog open={openPopupFile}
            fullWidth
            maxWidth="sm"
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
                    <h2> Dodaj nowy dokument </h2>
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
                        <label htmlFor="contained-button-file">
                            <Input accept="pdf/*" id="contained-button-file" multiple type="file" />
                            <Button sx={{ borderRadius: '55px', m: 1 }}
                                component="span" type="submit" color="secondary" variant="contained" onChange={handleChange}
                            >
                                <AddCircleOutlineOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />
                                Przeslij plik
                            </Button>
                        </label>

                        <TextField
                            id="name"
                            value={file?.name ?? ""}
                            onChange={handleChange}

                            sx={{ m: 1, width: '350px' }}
                            label="Nazwa pliku"
                            placeholder='Nazwa pliku'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ModeEditOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        <Autocomplete

                            id="clear-on-escape"
                            value={valueUser}

                            noOptionsText="Nie ma takiego użytkownika"
                            clearOnEscape
                            options={tableDataUsers}
                            getOptionLabel={(option) => option.fullName}
                            sx={{ m: 1, width: 350 }}
                            onChange={handleChange}
                            renderInput={(params) => <TextField
                                {...params} label="Nazwa szkoły" />} />


                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px', mt: 2 }}
                                type="submit" color="secondary" variant="contained"
                                onClick={save}
                            // disabled={!validateForm()}
                            >Wyślij</Button>
                        </Typography>

                    </Typography>

                    <Typography>
                        

                    </Typography>


                </Typography>

            </DialogContent>


        </Dialog>


    )
}