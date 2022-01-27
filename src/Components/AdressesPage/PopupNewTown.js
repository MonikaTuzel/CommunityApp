import { Dialog, DialogContent, DialogTitle} from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
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
    const {openPopupTown, setOpenPopupTown } = props;
    const [town, setNewTown] = useState({province:"dolnośląskie"});

    // function validateForm() {
    //     return town.name && town.province && town.district && town.commune;    
    //   }
      
    const handleClose = () => {
        setOpenPopupTown(false);
    };

    const handleChange = (event, newValue) => {

        let name = event.target.id;

        if (name.includes('clear-on-escape-option')) name = 'townId'

        setNewTown({

            ...town,

            [name]: newValue ?? event.target.value,

        });
        console.log(town, "newTown")

    };

    const save = async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(town),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(variables.API_URL_ADD_TOWN, options).then(() => {
            setNewTown()
        });

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
                            id="name"
                            value={town?.name??""}
                            onChange={handleChange}

                            sx={{ m: 1, width: '200px' }}
                            label="Nazwa miasta"
                            placeholder='Nazwa miasta'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ModeEditOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />
                            
                        <TextField
                            id="district"
                            value={town?.district ?? ""}
                            onChange={handleChange}

                            sx={{ m: 1, width: '200px' }}
                            label="Powiat"
                            placeholder='Powiat'
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
                        InputProps={{
                            readOnly: true,
                          }}
                            id="province"
                            value={town?.province ?? "dolnośląskie"}
                            onChange={handleChange}

                            sx={{ m: 1, width: '200px' }}
                            label="Województwo"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ModeEditOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />


                        <TextField
                            id="commune"
                            value={town?.commune ?? ""}
                            onChange={handleChange}

                            sx={{ m: 1, width: '200px' }}
                            label="Gmina"
                            placeholder='Gmina'
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
                                onClick={save}                                
                                // disabled={!validateForm()}
                            >Zapisz</Button>
                        </Typography>
                    </Typography>


                </Typography>

            </DialogContent>


        </Dialog>


    )
}