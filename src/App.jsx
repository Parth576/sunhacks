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
import Snackbar from '@mui/material/Snackbar';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Pantry from './components/Pantry';
import MealPlans from './components/Meals';
import ShoppingList from './components/ShoppingList';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#B3DC4B",
    },
    secondary: {
      main: "#d7ffaf",
    },

  },
});



function App() {
  
  let location = useLocation();
  const [pantry, setPantry] = useState({});
  const [shopItem, setCart] = useState({});

    function updatePantry(newVal, quantity) {
        if (newVal === null) return;
        if (quantity === 0) {
            if (newVal in pantry) return;
        }
        let newPantry = {
            ...pantry,
            [newVal] : quantity
        };
        setPantry(newPantry);
    };

    

    function addToShoppingCart(newVal, quantity){
      
      if (newVal === null) return;
      if (shopItem.hasOwnProperty(newVal)) {
        // If it exists, increment the quantity by 1
        shopItem[newVal] += 1;
      } else {
        // If it doesn't exist, add it with a quantity of 1
        shopItem[newVal] = quantity;
      }
      setCart({ ...shopItem });

    }

    function deleteFromPantry(pantryItem) {
        let newPantry = {
            ...pantry
        };
        delete newPantry[pantryItem];
        setPantry(newPantry);
    }

    function deleteFromCart(pantryItem) {
      let newCartItem = {
          ...shopItem
      };
      delete newCartItem[pantryItem];
      setCart(newCartItem);
  }

   

  return (
    <div>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
          <RamenDiningIcon fontSize='large' style={{ margin: 10, marginRight: 40 }}/>
          <Typography variant="h6" component="div" sx={{ marginLeft: 5 }}>
            <Link to='/'><Button variant={location.pathname === '/' ? 'contained':"text"}>Pantry</Button></Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginLeft: 5 }}>
            <Link to='/meals'><Button variant={location.pathname === '/meals' ? 'contained':"text"}>Meal Plan</Button></Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginLeft: 5 }}>
            <Link to='/list'><Button variant={location.pathname === '/list' ? 'contained':"text"}>Shopping List</Button></Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Routes>
          <Route path='/' element={<Pantry pantry={pantry} updatePantry={updatePantry} deleteFromPantry={deleteFromPantry} addToShoppingCart={addToShoppingCart} />}/>
          <Route path='/meals' element={<MealPlans/>}/>
          <Route path='/list' element={<ShoppingList shopItem={shopItem} addToShoppingCart={addToShoppingCart} deleteFromCart={deleteFromCart}/>}/>
        </Routes>
        
      </div>
    </Box>
  </ThemeProvider>
  </div>
  )
}

export default App
