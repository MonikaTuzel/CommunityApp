import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import { variables } from '../../Variables';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import InputMask from "react-input-mask";

const useStyles = makeStyles({

    contc: {
        width: '900px',
        height: 'auto',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        border: 1,
        borderRadius: '15px',
        borderColor: '#7986cb',
    }
})

export default function PopupDeliveryInfo(props) {
    const classes = useStyles()
    const { openPopupAddDelivery, setOpenPopupAddDelivery } = props;
    const [tableDataUsers, setTableDataUsers] = useState([])
    //const [value, setValue] = useState(new Date());
    const [valueUser, setValueUser] = useState(tableDataUsers[0]);
    const [delivery, setDelivery] = useState();
    const location = useLocation()


    // function validateForm() {

    //     return delivery.year;

    //   }

    useEffect(() => {
        fetch(variables.API_URL_USERS)
            .then((data) => data.json())
            .then((data) => setTableDataUsers(data))
    }, []);

    const handleClose = () => {
        setOpenPopupAddDelivery(false);
    };

    const handleChange = (event, newValue) => {

        let name = event.target.id;


        if (name.includes('clear-on-escape-option')) name = 'userId'

        setDelivery({

            ...delivery,

            [name]: newValue?.id ?? event.target.value,


        });

    };
    function refreshPage(){ 
        window.location.reload(); 
    }
    const save = async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(delivery),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(variables.API_URL_DELIVERY_CREATE, options).then(handleClose()).then(refreshPage)
    }
    console.log(delivery, "newDelivery")


    return (
        <Dialog open={openPopupAddDelivery}
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
                    <h2> Dodaj now?? dostaw?? </h2>
                </div>
            </DialogTitle>
            <DialogContent sx={{
                display: "flex",
                justifyContent: 'center',
                textAlign: 'center',
            }}>
                <Typography
                    component={'span'}
                    className={classes.contc}
                    p={1}
                    sx={{ boxShadow: 3 }}  >

                    <Typography component={'span'}>


                        <Autocomplete

                            id="clear-on-escape"
                            value={valueUser}

                            noOptionsText="Nie ma takiego u??ytkownika"
                            clearOnEscape
                            options={tableDataUsers}
                            getOptionLabel={(option) => option.fullName}
                            sx={{ m: 1.5, width: 350 }}
                            onChange={handleChange}
                            renderInput={(params) => <TextField
                                {...params} label="Nazwa szko??y" />} />


                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3} sx={{ m: 1.5, width: '350px' }}>
<input type="date" id="deliveryDate" name="deliveryDate" 
                                                     onChange={handleChange}

                            />
                                {/* <DatePicker
                                    id="deliveryDate"
                                    type="datetime-local"
                                    // mask='__/__/____'
                                    // views={['day']}
                                    label="Termin dostawy"
                                    value={value}
                                    onChange={async (newValue) => {
                                        setValue(newValue)
                                        setDelivery({

                                            ...delivery,
                                
                                            date: value,
                                
                                        });

                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                /> */}
                            </Stack>
                        </LocalizationProvider>

                        


                        <TextField
                            id="description"
                            value={delivery?.description}
                            onChange={handleChange}

                            sx={{ m: 1.5, width: '350px' }}
                            label="Uwagi"
                            placeholder='Uwagi'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                    </Typography>

                    <Typography component={'span'}>
                        <InputMask
                            mask="9999/9999"

                            value={delivery?.year}
                            maskChar=" "
                            onChange={handleChange}
                        >
                            {() =>  <TextField
                            id="year"
                            //value={delivery?.year}
                            //onChange={handleChange}

                            sx={{ m: 1.5, width: '350px' }}
                            label="Rok szkolny"
                            placeholder='Rok szkolny'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' /> }

                            </InputMask>

                        <TextField
                            id="semestr"
                            value={delivery?.semestr}
                            onChange={handleChange}
                            type='number'

                            sx={{ m: 1.5, width: '350px' }}
                            label="semestr"
                            placeholder='semestr'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                             
                             <TextField
                            id="week"
                            value={delivery?.week}
                            onChange={handleChange}
                            type='number'
                            sx={{ m: 1.5, width: '350px' }}
                            label="Tydzie??"
                            placeholder='Tydzie??'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            color='secondary' />

                        {/* <Autocomplete
                            options={yearOptions}

                            clearOnEscape
                            disablePortal
                            getOptionLabel={(option) => option.label}
                            id="year"
                            noOptionsText="Ten rok nie jest jeszcze dost??pny"
                            sx={{ m: 2, width: 350 }}
                            renderInput={(params) => <TextField {...params} label="Rok szkolny" />}
                        />

                        <Autocomplete
                            value={valueSemestr}

                            options={semestrOptions}
                            getOptionLabel={(option) => option.semestr}
                            onChange={handleChange}

                            clearOnEscape
                            disablePortal
                            id="semestr"
                            noOptionsText="Nie ma takiego semestru"
                            sx={{ m: 2, width: 350 }}
                            renderInput={(params) => <TextField {...params} label="Semestr" />}
                        />

                        <Autocomplete
                            options={weekOptions}

                            clearOnEscape
                            disablePortal
                            getOptionLabel={(option) => option.label}

                            id="week"
                            noOptionsText="Nie ma takiego tygodnia"
                            sx={{ m: 2, width: 350 }}
                            renderInput={(params) => <TextField {...params} label="Tydzie??" />}
                        /> */}

                        <Typography sx={{
                            display: "flex",
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                sx={{ width: '120px', height: '40px' }}
                                type="submit" color="secondary" variant="contained"
                                onClick={save}
                                // disabled={!validateForm()}
                            >
                                Akceptuj
                            </Button>
                        </Typography>

                    </Typography>
                </Typography>
            </DialogContent>
        </Dialog>


    )
}

// const yearOptions = [
//     { label: '2020 / 2021' },
//     { label: '2021 / 2022' },
//     { label: '2022 / 2023' },
//     { label: '2023 / 2024' },
// ]

// const semestrOptions = [
//     { semestr: '1', id: 1 },
//     { semestr: '2',  id: 2 }
// ]

// const weekOptions = [
//     { label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }, { label: '5' }, { label: '6' }, { label: '7' }, { label: '8' }, { label: '9' }, { label: '10' },
//     { label: '11' }, { label: '12' }, { label: '13' }, { label: '14' }, { label: '15' }, { label: '16' }, { label: '17' }, { label: '18' }, { label: '19' }, { label: '20' },
//     { label: '21' }, { label: '22' }, { label: '23' }, { label: '24' }, { label: '25' }, { label: '26' }, { label: '27' }, { label: '28' }, { label: '29' }, { label: '30' },
//     { label: '31' }, { label: '32' }, { label: '33' }, { label: '34' }, { label: '35' }, { label: '36' }, { label: '37' }, { label: '38' }, { label: '39' }, { label: '40' },
//     { label: '41' }, { label: '42' }, { label: '43' }, { label: '44' }, { label: '45' }, { label: '46' }, { label: '47' }, { label: '48' }, { label: '49' }, { label: '50' },
//     { label: '51' }, { label: '52' }
// ]
