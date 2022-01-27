import React, { useState, useEffect } from 'react';
import { ListItemIcon, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Popup from './Popup';
import { variables } from '../../Variables';

const useStyles = makeStyles({

    contc: {
        width: '600px',
        height: '500px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        textAlign: 'center',
        borderRadius: '15px',
    },
    mess: {
        width: '100%',
        height: 'auto',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 400,
        '& ul': { padding: 0 },
    }

})

export default function Contacts() {
    const classes = useStyles()
    const [tableData, setTableData] = useState([])
    const [message, setMessage] = useState()
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        fetch(variables.API_URL_MESSAGE+"/1006")
            .then((data) => data.json())
            .then((data) => setTableData(data))
            .then(response => console.log(response))
    },[])


    const setChangeStatus = async (id) => {
        let element = tableData.find(el => el.id == id)
       
            const options = {
                method: 'PUT',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json'
                }
             };             
             fetch(variables.API_URL_MESSAGE_READ +`/${id}`, options)
        
        setMessage(element)                
      }


      const getInfo = async (id) => {
        let element = tableData.find(el => el.id == id)
        setMessage(element)
        console.log(element, "element");
      }
    
    return (
        <Container  sx={{ padding: 3 }}>

            <Typography
                className={classes.contc} p={1}
                sx={{ boxShadow: 10, border: 2, borderColor: '#c5cae9' }}  >

                <Typography
                    variant='h5'
                    color='#e8eaf6'
                    component='h2'
                    align="center"
                    sx={{
                        border: 1,
                        borderRadius: '15px',
                        borderColor: '#7986cb',
                        boxShadow: 5,
                        background: '#5c6bc0',
                        width: "80%",
                    }}>

                    Twoje wiadomości
                </Typography>
                
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    message={message}
                >
                </Popup>

                <Typography sx={{ height: '400px', width: '580px', boxShadow: 3 }} >
                    <List dense
                        className={classes.mess} >
                        {tableData.map((message) => {
                            return (              
                                <ListItem sx={{ height: '80px', width: '550px', boxShadow: 2, border: 1,
                                borderRadius: '15px',
                                borderColor: '#e1f5fe',
                                m: 1, }}                          
                                disablePadding
                                >                
                                    <ListItemButton                            
                                        style={{ background: message.statusName == "Nieprzeczytane"  ?  '#e1f5fe' :  null }} 
                                        onClick={async () => {
                                            await getInfo(message.id).then(() => {
                                                setOpenPopup(true);
                                                if(message.statusName == "Nieprzeczytane")
                                                {
                                                    setChangeStatus(message.id)
                                                }
                                            })
                                          }}
                                        >             
                                        <ListItem alignItems="flex-start">
                                            <ListItemIcon>
                                                <EmailOutlinedIcon color="secondary" sx={{fontSize:"xx-large"}} />                                                
                                            </ListItemIcon>
                                             <ListItemText
                                                key={message.Id}
                                                primary={message.topic}
                                                secondary={                                            
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >                               
                                                        Nadawca: {message.senderName}                                                                                                                                                                                         
                                                        </Typography>      
                                                    </React.Fragment>
                                                }
                                            />                                                                    
                                        </ListItem>                                        
                                    </ListItemButton>                                    
                                </ListItem> 
                            );                            
                        })}
                    </List>
                </Typography>

            </Typography>

        </Container>
        
    );
}

