import React from 'react';
import { SidebarData } from './SidebarData';
import { List, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { makeStyles} from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeConsumer } from 'styled-components';
import { format } from 'date-fns';

const drawerWidth = 200

const useStyles = makeStyles((theme) => {
  return {
  page: {
    background: '#f9f9f9',
    width: '100%'
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    //background: '#f0f4c3',
  },
  root: {
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',  
  },
  active: {
    background: '#aed581',
    borderRadius: '15px',
  },
  tlo: {
    margin: 10,
    marginLeft: 0,
  },
  logo: {
    display:"flex",
    justifyContent: "center",
    marginTop: 15,
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1
  }
}})

export default function Navbar({children}) {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={classes.root}>
      
      <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, backgroundColor: "white"}}>
        <Toolbar sx={{    display:"flex",     justifyContent: "center" 
}}>
          <Typography>
            Dzisiejsza data: { format(new Date(), 'd MM Y') }
          </Typography>    

          <Typography>
            Avatar
          </Typography>          
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant='h5'  >

            <NavLink  to="/home" className={classes.logo} >

              <img src="Kleks_logo.png" alt="kleks" style={{ width: 100}} />

            </NavLink>

          </Typography>
        </div>
        
        <div className={classes.tlo}>
        <List>
          {SidebarData.map(item => (
            <Typography className={location.pathname == item.path ? classes.active : classes.unactive} 
              sx={{display: 'flex',
                width: 180, 
                m: 1, borderRadius: '15px', 
                '&:hover': {
                  borderRadius: '15px',
              },}}>
              <ListItemButton      
                key={item.title}
                onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant='h6'> {item.title}</Typography>
              </ListItemButton>
            </Typography>
          ))}
        </List>      
        </div>    
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}


