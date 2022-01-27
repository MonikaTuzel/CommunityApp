import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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

export default function Contacts() {
    const classes = useStyles()
    const [tableData, setTableData] = useState([])
    const [adressData, setAdressData] = useState([])


    useEffect(() => {
        fetch(variables.API_URL_USERS + "/1006")
            .then((data) => data.json())
            .then((data) => setTableData(data))
    })

    useEffect(() => {
        fetch(variables.API_URL_ADRESS + "/1006")
            .then((data) => data.json())
            .then((data) => setAdressData(data))
    })


    return (
        <Container sx={{ padding: 2 }}  >

            <Typography className={classes.contc} p={1}
                sx={{ boxShadow: 5, border: 2, borderColor: '#c5cae9' }}  >

                <Typography className={classes.info}>

                    <Typography className={classes.account} sx={{ borderRight: 2, borderColor: '#c5cae9' }}>

                        <Avatar alt="szkola" src="logo_szkoła.png" sx={{ width: 200, height: 180, m: 3 }} />
                        <h3>{tableData.fullName}</h3>
                        <h5>{tableData.shortName}</h5>

                    </Typography>

                    <Typography sx={{ m: 3, width: '95%', height: 'auto'}}>
                        <Typography sx={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h2>Twój profil</h2>
                            <p>Niekóre z danych możesz aktualizować</p>
                        </Typography>
                        <Typography sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                            <Typography >

                                <Typography sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                                    <Typography>
                                    
                                        <Typography>
                                            <TextField
                                                sx={{ m: 1, mt: 2, width: '200px' }}
                                                label="Ulica"
                                                placeholder='Ulica'
                                                color='secondary'
                                                value={adressData?.street??""}
                                                id="street"
                                            //onChange={handleChange}
                                            />
                                            <TextField
                                                sx={{ m: 1, mt: 2, width: '80px' }}
                                                label="Numer"
                                                placeholder='Numer'
                                                color='secondary'
                                                value={adressData?.number??""}
                                                id="number"
                                            //onChange={handleChange}
                                            />
                                        </Typography>
                                        <Typography>
                                            <TextField
                                            disabled
                                                sx={{ m: 1, mt: 2, width: '200px' }}
                                                label="Miasto"
                                                placeholder='Miasto'
                                                color='secondary'
                                                value={adressData?.townName??""}
                                                id="townName"
                                            //onChange={handleChange}
                                            />
                                            <TextField
                                            disabled
                                                sx={{ m: 1, mt: 2, width: '80px' }}
                                                label="Kod"
                                                placeholder='Kod'
                                                color='secondary'
                                                value={adressData?.code??""}
                                                id="code"
                                            //onChange={handleChange}
                                            />
                                        </Typography>

                                        <Typography>
                                            <TextField
                                                sx={{ m: 1, mt: 2, width: '300px' }}
                                                label="Ilość uczniów"
                                                placeholder='Ilość uczniów'
                                                color='secondary'
                                                value={tableData?.studentScore??""}
                                                id="studentScore"
                                            //onChange={handleChange}
                                            />
                                        </Typography>
                                    </Typography>

                                    <Typography>
                                        <TextField
                                        disabled
                                            sx={{ m: 1, mt: 2, width: '250px' }}
                                            label="Województwo"
                                            placeholder='Województwo'
                                            color='secondary'
                                            value={adressData?.province??""}
                                            id="province"
                                        //onChange={handleChange}
                                        />
                                        <TextField
                                        disabled
                                            sx={{ m: 1, mt: 2, width: '250px' }}
                                            label="Gmina"
                                            placeholder='Gmina'
                                            color='secondary'
                                            value={adressData?.district??""}
                                            id="district"
                                        //onChange={handleChange}
                                        />
                                        <TextField
                                            disabled
                                            sx={{ m: 1, mt: 2, width: '250px' }}
                                            label="Powiat"
                                            placeholder='Powiat'
                                            color='secondary'
                                            value={adressData?.commune??""}
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
                                            sx={{ m: 1, mt: 2, width: '280px' }}
                                            label="Adres e-mail"
                                            placeholder='Adres e-mail'
                                            color='secondary'
                                            defaultValue="nazwa uzytkownika"
                                            value={tableData?.email}
                                            id="fullName"
                                        //onChange={handleChange}
                                        />
                                        <TextField
                                            sx={{ m: 1, mt: 2, width: '280px' }}
                                            label="Numer telefonu"
                                            placeholder='Numer telefonu'
                                            color='secondary'
                                            defaultValue="nazwa uzytkownika"
                                            value={tableData?.phone}
                                            id="fullName"
                                        //onChange={handleChange}
                                        />
                                    </Typography>
                                    <Typography sx={{
                                        display: "flex",
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Button
                                            sx={{ width: '150px', height: '40px', mt: 2 }}
                                            type="submit" color="secondary" variant="contained"
                                            //onClick={save}
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
