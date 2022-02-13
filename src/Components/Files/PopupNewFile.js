import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { variables } from '../../Variables';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import Input from '@mui/material/Input';

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
    const [tableDataUsers, setTableDataUsers] = useState([])
    const [valueUser, setValueUser] = useState(tableDataUsers[0]);
    const [fileDetails, setFileDetails] = useState();


    const [file, setFile] = useState(false);

    const handleInputChange = (event) => {
        setFile(event.target.files[0]);
    };

    const upload = (e) => {
        let formData = new FormData();
        formData.append("files", file);

        formData.append("name", fileDetails.name);
        formData.append("userId", fileDetails.userId);

        axios({
            method: "post",
            url: variables.API_URL_DOCUMENTS_NEWUPLOAD,
            data: formData

        }).then(({ data }) => {
            console.log("Succesfully uploaded: ", JSON.stringify(data));
        }).then(handleClose());            

    };

    const handleChange = (event, newValue) => {

        let name = event.target.id;

        if (name.includes('clear-on-escape-option')) name = 'userId'

        setFileDetails({

            ...fileDetails,

            [name]: newValue?.id ?? event.target.value,

        });
    };   

    const handleClose = () => {
        setOpenPopupFile(false);
    };

    useEffect(() => {
        fetch(variables.API_URL_USERS)
            .then((data) => data.json())
            .then((data) => setTableDataUsers(data))
        }, []);

   
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
                            <Input
                                type="file" onChange={handleInputChange}
                                accept="pdf/*" id="contained-button-file" 
                                sx={{m:1}}/>
                        </label>

                        <TextField
                            id="name"
                            value={fileDetails?.name?? ""}
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
                                onClick={upload}
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