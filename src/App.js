import React from 'react'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Pages/Home';
import Contacts from './Pages/Contacts.js';
import Delivery from './Pages/Delivery';
import Files from './Pages/Files';
import Users from './Pages/Users';
import Adresses from './Pages/Adresses';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { lightGreen } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[100],
    },
    secondary: {
      main: '#689f38',
    },
    background: {
      paper: '#fff',
      default: "#9ccc65"
    },
    action: {
      hover: '#c5e1a5',
    }
  },
  typography: {
    fontFamily: 'Merriweather',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h6: {
      fontSize: "15px",
      fontWeight: 200,
    }
  }
})

function App() {

  const WithNav = () => {
    return (
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
    )
  }

  return (
    <ThemeProvider theme={theme}>          

      <HashRouter>   
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<WithNav />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}



export default App
