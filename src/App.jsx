import { useState, useEffect } from 'react'
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { Routes } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  

  return (
    <div>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
          <RamenDiningIcon fontSize='large' style={{ margin: 10, marginRight: 40 }}/>
          <Typography variant="h6" component="div" sx={{ marginLeft: 5 }}>
            <Button variant="text">Pantry</Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginLeft: 5 }}>
            <Button variant="text">Meal Plan</Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginLeft: 5 }}>
            <Button variant="text">Shopping List</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Routes>
        </Routes>
      </div>
    </Box>
  </ThemeProvider>
  </div>
  )
}

export default App
