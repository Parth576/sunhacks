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

  const [calorieG, setCaloriesG] = useState(1800);
  const [proteinG, setProteinG] = useState(65);
  const [carbG, setCarbG] = useState(250);
  const [selectedMeals, setSelectedMeals] = useState({
    'b': {"calories":0, 'protein': 0, "carb": 0},
    'l': {"calories":0, 'protein': 0, "carb": 0},
    'd': {"calories":0, 'protein': 0, "carb": 0}
  });

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
        let newCart = {
          ...shopItem,
          [newVal]: shopItem[newVal]+=1
        }
        setCart(newCart);
      } else {
        let newCart = {
          ...shopItem,
          [newVal]: quantity
        }
        setCart(newCart);
      }

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
          <Box sx={{ flexGrow: 1 }} />
          <Typography component="div" sx={{ marginLeft: 5, color: "#B3DC4B"}}> CALORIE GOAL: {selectedMeals['b']['calories']+selectedMeals['l']['calories']+selectedMeals['d']['calories']}/{calorieG}
          </Typography>
          <Typography  component="div" sx={{ marginLeft: 5, color: "#B3DC4B" }}> PROTEIN GOAL: {selectedMeals['b']['protein']+selectedMeals['l']['protein']+selectedMeals['d']['protein']}/{proteinG}
          </Typography>
          <Typography  component="div" sx={{ marginLeft: 5, color: "#B3DC4B" }}> CARB GOAL: {selectedMeals['b']['carb']+selectedMeals['l']['carb']+selectedMeals['d']['carb']}/{carbG}
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Routes>
          <Route path='/' element={<Pantry 
          setPantry={setPantry} pantry={pantry} updatePantry={updatePantry} deleteFromPantry={deleteFromPantry} addToShoppingCart={addToShoppingCart} 
          calorieG={calorieG} setCaloriesG={setCaloriesG} proteinG={proteinG} setProteinG={setProteinG} carbG={carbG} setCarbG={setCarbG} />}/>
          <Route path='/meals' element={<MealPlans pantry={pantry} selectedMeals={selectedMeals} setSelectedMeals={setSelectedMeals}/>}/>
          <Route path='/list' element={<ShoppingList shopItem={shopItem} addToShoppingCart={addToShoppingCart} deleteFromCart={deleteFromCart}/>}/>
        </Routes>
        
      </div>
    </Box>
  </ThemeProvider>
  </div>
  )
}

export default App
