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

export default function PopupUpdateFile(props) {

    const classes = useStyles()
    const { openPopupFileUpdate, setOpenPopupFileUpdate, file} = props;
    const [newFile, setFile] = useState(false);

    const handleInputChange = (event) => {
        setFile(event.target.files[0]);
    };
    
        const upload = (e) => {
            let formData = new FormData();
            formData.append("files", newFile);
        
            axios({
                method: "put",
                url: variables.API_URL_DOCUMENTS_UPDATE+`/${file.id}`,
                data: formData
    
            }).then(({ data }) => {
                console.log("Succesfully uploaded: ", JSON.stringify(data));
            }).then(handleClose());            
    
        };
    

    const handleClose = () => {
        setOpenPopupFileUpdate(false);
    };

    return (
        <Dialog open={openPopupFileUpdate}
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
                    <h2> Odeślij dokument </h2>
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
                                accept="pdf/*" id="contained-button-file" color='secondary' 
                                sx={{m:1}}/>    
                        </label>
                       
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