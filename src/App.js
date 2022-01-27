import React from 'react'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import {Home} from './Pages/Home';
import Contacts from './Pages/Contacts.js';
import Delivery from './Pages/Delivery';
import {Files} from './Pages/Files';
import Users from './Pages/Users';
import Adresses from './Pages/Adresses';
import Settings from './Pages/Settings';
import { Routes, Route } from 'react-router-dom';
import {indigo} from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[100],
    },
    secondary: {
      main: '#7986cb',
    },    
    background: {
      paper: '#fff',
      default: "#ff0000"
    },
    action: {
      hover: '#a6d4fa'
    }    
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})


 function App() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/delivery' element={<Delivery />} />
              <Route path='/files' element={<Files />} />
              <Route path='/adresses' element={<Adresses />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </Navbar>
        </Router>
      </ThemeProvider>
    )
  }

export default App
