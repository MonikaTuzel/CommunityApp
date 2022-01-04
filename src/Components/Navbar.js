import React from 'react';
import { SidebarData } from './SidebarData';
import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import {ListItemText, makeStyles} from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';

const drawerWidth = 200

const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    width: '100%'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#f9f9f9',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  


  },
  active: {
    background: '#c5cae9',
    borderBottom: '2px solid #5c6bc0',
  },
  tlo: {
    margin: 10,
    marginLeft: 0,
  },
  logo: {
    width: 130,
    marginLeft:30,
    marginTop:20
  }
})

export default function Navbar({children}) {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant='h5'>

            <NavLink  to="/home">

              <img src="Kleks_logo.png" alt="kleks" className={classes.logo} />

            </NavLink>

          </Typography>
        </div>
        
        <div className={classes.tlo}>
        <List>
          {SidebarData.map(item => (
            <div className={location.pathname == item.path ? classes.active : classes.unactive}>
              <ListItemButton      
                key={item.title}
                onClick={() => navigate(item.path)}
                
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title}  />
              </ListItemButton>
            </div>
          ))}
        </List>      
        </div>    
      </Drawer>

      <div className={classes.page}>
        {children}
      </div>
    </div>
  );
}


