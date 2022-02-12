import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import Avatar from '@mui/material/Avatar';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    
    info: {
        width: '100%',
        height: 'auto',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '15px',
        background: 'white',
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

export default function HomePage() {
    const classes = useStyles()
    const [tableData, setTableData] = useState([])
    const location = useLocation()

    useEffect(() => {
        fetch(variables.API_URL_USERS + `/${location.state.id}`)
            .then((data) => data.json())
            .then((data) => setTableData(data))            
    },[]);
   
console.log(location.state, "HP")

    return (
        <Container sx={{ padding: 2 }}  >
            

                <Typography className={classes.info}>

                    <Typography className={classes.account} sx={{ borderRight: 2, borderColor: '#c5cae9' }}>

                        <img src="mleko.jpg" alt="mleko" style={{ width: 400}} />

                    </Typography>

                    <Typography sx={{ m: 3, width: '95%', height: 'auto'}}>
                        <h1>Witaj!</h1>
                        <h3>Jesteś zalogowany jako użytkownik: {tableData.fullName} </h3>                                                
                    </Typography>

                </Typography>



        </Container>
    )
}
