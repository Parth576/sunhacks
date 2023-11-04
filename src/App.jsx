import { useState, useEffect } from 'react'
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
    <Box sx={{ flexGrow: 1, mx:"1em", my:"2em" }}>
      
    </Box>
  </ThemeProvider>
  </div>
  )
}

export default App
