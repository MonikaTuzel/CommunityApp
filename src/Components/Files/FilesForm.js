import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import Avatar from '@mui/material/Avatar';


const useStyles = makeStyles({

    contc: {
        width: 'auto',
        height: 'auto',
        display: "flex",
        flexDirection: 'row',
        flexWrap:"wrap",
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

    const download = React.useCallback(
        (id) => () => {

            const options = {
            method: 'GET',

            headers: {
              'Content-Type': 'application/json'
            }
          };
      
          fetch(variables.API_URL_DOCUMENTS_DOWNLOAD + `/${id}`, options)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(
              new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              `document.pdf`,
            );
        
            document.body.appendChild(link);
        
            link.click();
        
            link.parentNode.removeChild(link);              

          })
        },
      );
    
    return (
        <Container sx={{ padding: 3 }}  >
            <Typography component="span" sx={{ display:"flex", justifyContent: 'space-around', alignItems:'stretch', flexDirection: 'row', flexWrap:"wrap"}}>                            

                {filesData.map((file) => {
                    return (
                        <Typography component="span" sx={{ padding: 3 }} >

                            <Typography className={classes.contc} p={1}
                                sx={{ boxShadow: 10, border: 2,  
                                borderColor: file.statusName == "Zrealizowano" ?  "#b2ff59" : "#ffeb3b",
                                background: file.statusName == "Zrealizowano" ? "#b2ff59" : "#ffeb3b" }} >
                                <Avatar alt="file" src="grafika_dok.png" sx={{ width: 180, height: 160, m: 1 }} />

                                <Typography sx={{display:"flex", justifyContent: 'space-around',flexDirection: 'column', m: 1 }}>
                                    <h4>{file.name}</h4>
                                    <Typography>
                                        <h7>Data: {file.updateDate}</h7>
                                        <h6>{file.statusName}</h6>
                                    </Typography>
                                    <Typography sx={{display:"flex", justifyContent:'flex-end'}}>
                                        <Button sx={{ width: '80px', height: '25px', mr: 2 }}
                                            type="submit" color="info" variant="contained"
                                            onClick={download(file.id)}
                                            >
                                            Pobierz
                                        </Button>
                                        <Button sx={{ width: '80px', height: '25px'}}
                                            type="submit" color="success" variant="contained"
                                            disabled={file.statusName == "Zrealizowano"}>
                                            Odeślij
                                        </Button>
                                    </Typography>
                                </Typography>

                            </Typography>

                        </Typography>


                    )
                })}

        </Typography>

        </Container >
    )
}
