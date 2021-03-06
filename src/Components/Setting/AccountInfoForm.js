import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import Avatar from '@mui/material/Avatar';
import InputMask from "react-input-mask";
import { useLocation } from 'react-router-dom';

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
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '15px',
    },
    account: {
        width: '50%',
        height: 'auto',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center'
    }
})

export default function AccountInfoForm() {
    const classes = useStyles()
    const [tableData, setTableData] = useState([])
    const [adressData, setAdressData] = useState([])
    const [newUser, setNewUser] = useState({tableData, adressData});
    const location = useLocation()

    function validateForm() {
        return newUser?.street && newUser?.number && newUser?.studentScore && newUser?.phone;
    }

    useEffect(() => {
        fetch(variables.API_URL_USERS + `/${location.state.id}`)
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, []);

    useEffect(() => {
        fetch(variables.API_URL_ADRESS + `/${location.state.id}`)
            .then((data) => data.json())
            .then((data) => setAdressData(data))
    }, []);

    useEffect(() => {
        if (tableData)
            setNewUser(tableData);
    }, [tableData]);

    useEffect(() => {
        if (adressData)
            setNewUser(adressData);
    }, [adressData]);

    const handleChange = (event) => {

        const name = event.target.id;

        setNewUser({

            ...newUser,

            [name]: event.target.value,

        }); 

    };
    function refreshPage() {
        window.location.reload();
    }
    const updateUser = async () => {
        const editUser = {
            street: newUser.street,
            number: newUser.number,
            studentScore: newUser.studentScore,
            phone: newUser.phone,
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify(editUser),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(variables.API_URL_USERS + `/${location.state.id}`, options).then(refreshPage);        
                //console.log(editUser, "userChange")

    }

    return (
        <Container sx={{ padding: 2 }}  >

            <Typography className={classes.contc} p={1}
                sx={{ boxShadow: 5, border: 2, borderColor: '#c5cae9' }}  >

                <Typography className={classes.info}>

                    <Typography className={classes.account} sx={{ borderRight: 2, borderColor: '#c5cae9' }}>

                        <Avatar alt="szkola" src="logo_szko??a.png" sx={{ width: 200, height: 180, m: 3 }} />
                        <h3>{tableData.fullName}</h3>
                        <h5>{tableData.shortName}</h5>

                    </Typography>

                    <Typography sx={{ m: 3, width: '95%', height: 'auto' }}>
                        <Typography sx={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h2>Tw??j profil</h2>
                            <p>Niek??re z danych mo??esz aktualizowa??</p>
                        </Typography>
                        <Typography sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                            <Typography >

                                <Typography sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                                    <Typography>

                                        <Typography>
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                sx={{ m: 1, mt: 2, width: '190px' }}
                                                label="Ulica"
                                                placeholder='Ulica'
                                                color='secondary'
                                                value={newUser?.street}
                                                id="street"
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                sx={{ m: 1, mt: 2, width: '90px' }}
                                                label="Numer"
                                                placeholder='Numer'
                                                color='secondary'
                                                value={newUser?.number}
                                                id="number"
                                                onChange={handleChange}
                                            />
                                        </Typography>
                                        <Typography>
                                            <TextField
                                                disabled
                                                sx={{ m: 1, mt: 2, width: '190px' }}
                                                label="Miasto"
                                                placeholder='Miasto'
                                                color='secondary'
                                                value={adressData?.townName ?? ""}
                                                id="townName"
                                            //onChange={handleChange}
                                            />
                                            <InputMask
                                                mask="99-999"
                                                value={adressData?.code ?? ""}
                                                disabled={true}
                                                maskChar=" "
                                                onChange={handleChange}
                                            >
                                                {() => <TextField
                                                    disabled
                                                    sx={{ m: 1, mt: 2, width: '90px' }}
                                                    label="Kod"
                                                    placeholder='Kod'
                                                    color='secondary'
                                                    value={adressData?.code ?? ""}
                                                    id="code"
                                                //onChange={handleChange}
                                                />}
                                            </InputMask>

                                        </Typography>

                                        <Typography>
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                sx={{ m: 1, mt: 2, width: '300px' }}
                                                label="Ilo???? uczni??w"
                                                placeholder='Ilo???? uczni??w'
                                                color='secondary'
                                                value={newUser?.studentScore}
                                                id="studentScore"
                                                onChange={handleChange}
                                            />
                                        </Typography>
                                    </Typography>

                                    <Typography>
                                        <TextField
                                            disabled
                                            sx={{ m: 1, mt: 2, width: '250px' }}
                                            label="Wojew??dztwo"
                                            placeholder='Wojew??dztwo'
                                            color='secondary'
                                            value={adressData?.province ?? ""}
                                            id="province"
                                        //onChange={handleChange}
                                        />
                                        <TextField
                                            disabled
                                            sx={{ m: 1, mt: 2, width: '250px' }}
                                            label="Gmina"
                                            placeholder='Gmina'
                                            color='secondary'
                                            value={adressData?.district ?? ""}
                                            id="district"
                                        //onChange={handleChange}
                                        />
                                        <TextField
                                            disabled
                                            sx={{ m: 1, mt: 2, width: '250px' }}
                                            label="Powiat"
                                            placeholder='Powiat'
                                            color='secondary'
                                            value={adressData?.commune ?? ""}
                                            id="commune"
                                        //onChange={handleChange}
                                        />
                                    </Typography>
                                </Typography>

                                <h5>Dane kontaktowe</h5>
                                <Typography>
                                    <Typography>
                                        <TextField
                                            disabled
                                            sx={{ m: 1, mt: 2, width: '300px' }}
                                            label="Adres e-mail"
                                            placeholder='Adres e-mail'
                                            color='secondary'
                                            defaultValue="nazwa uzytkownika"
                                            value={tableData?.email}
                                            id="fullName"
                                        //onChange={handleChange}
                                        />

                                        <InputMask
                                            mask="999999999"
                                            value={newUser?.phone}
                                            disabled={false}
                                            maskChar=" "
                                            onChange={handleChange}
                                        >
                                            {() => <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                sx={{ m: 1, mt: 2, width: '300px' }}
                                                label="Numer telefonu"
                                                placeholder='Numer telefonu'
                                                color='secondary'
                                                id="phone"
                                                
                                            />}
                                        </InputMask>

                                    </Typography>
                                    <Typography sx={{
                                        display: "flex",
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Button
                                            sx={{ width: '150px', height: '40px', mt: 2 }}
                                            type="submit" color="secondary" variant="contained"
                                            onClick={updateUser}
                                            //disabled={!validateForm()}
                                        >Zapisz zmiany</Button>
                                    </Typography>
                                </Typography>


                            </Typography>



                        </Typography>

                    </Typography>

                </Typography>


            </Typography>

        </Container>
    )
}
