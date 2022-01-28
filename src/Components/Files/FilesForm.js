import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const useStyles = makeStyles({

    contc: {
        width: 'auto',
        height: 'auto',
        display: "flex",
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // textAlign: 'center',
        // alignItems:'center',
        borderRadius: '15px',
    }
})

export default function FilesForm() {
    const [filesData, setFilesData] = useState([])
    const classes = useStyles()

    useEffect(() => {
        fetch(variables.API_URL_DOCUMENTS_USER + "/1006")
            .then((data) => data.json())
            .then((data) => setFilesData(data))
    }, []);
    console.log(filesData, "doku")


    return (
        <Container sx={{ padding: 3 }}  >
            <List>
                {filesData.map((file) => {
                    return (
                        <ListItem sx={{ display:"flex",
                        flexDirection:'row'}}>
                            <Typography className={classes.contc} p={1}
                                sx={{ boxShadow: 10, border: 2, borderColor: '#c5cae9' }} >
                                <Avatar alt="file" src="grafika_dok.png" sx={{ width: 180, height: 160, m: 3 }} />

                                <Typography sx={{ m: 2 }}>
                                    Nazwa pliku: {file.name}
                                </Typography>

                            </Typography>

                        </ListItem>


                    )
                })}

        </List>

        </Container >
    )
}
