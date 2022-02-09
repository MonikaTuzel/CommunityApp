import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { variables } from '../../Variables';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { styled } from '@mui/material/styles';
import PopupNewFile from './PopupNewFile';


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

export default function FilesForm({id}) {
    const [filesData, setFilesData] = useState([])
    const [tableData, setTableData] = useState([])

    const classes = useStyles()
    const [user, setUser] = useState([])
    const [openPopupFile, setOpenPopupFile] = useState(false)

    const Input = styled('input')({
        display: 'none',
      });

      useEffect(() => {
        fetch(variables.API_URL_USERS + `/${id}`)
        .then((data) => data.json())
        .then((data) => setUser(data))
        .then(() => {
  
         if(user.roleId === 2){
            fetch(variables.API_URL_DOCUMENTS_USER + `/${user.id}`)
            .then((data) => data.json())
            .then((data) => setFilesData(data))
        }
        if(user.roleId === 1){
            fetch(variables.API_URL_DOCUMENTS_USER)
                .then((data) => data.json())
                .then((data) => setFilesData(data))
        }  
        },[]); })

    function roleForm() {
        if(user.roleId === 1)
        return 1;    
      }
  
    const update = React.useCallback(
        (id) => () => {
        const options = {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(variables.API_URL_DOCUMENTS_UPDATE, options)
        });

    

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
            <Typography>
                <Button sx={{ borderRadius: '55px', m: 1 }}
                    component="span" type="submit" color="secondary" variant="contained"
                    onClick={() => setOpenPopupFile(true)}
                    disabled={!roleForm()}>
                    <AddCircleOutlineOutlinedIcon sx={{ fontSize: 25, mr: 1 }} />
                    Dodaj
                </Button>
            </Typography>                        

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
                                        <label htmlFor="contained-button-file">
                                            <Input accept="pdf/*" id="contained-button-file" multiple type="file" />
                                            <Button sx={{ width: '80px', height: '25px'}}
                                            type="submit" color="success" variant="contained" component="span"
                                            disabled={file.statusName == "Zrealizowano"}
                                            onClick={async () => {update(file.id)}}
                                            >
                                            Odeślij
                                        </Button>
                                        </label>
                                        
                                    </Typography>
                                </Typography>

                            </Typography>

                        </Typography>


                    )
                })}

        </Typography>

        <PopupNewFile
          openPopupFile={openPopupFile}
          setOpenPopupFile={setOpenPopupFile}>
        </PopupNewFile>

        </Container >
    )
}
