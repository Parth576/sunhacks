import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import ingredientData from '../data/ingredient_data.json';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




function Pantry({ pantry, updatePantry, deleteFromPantry, addToShoppingCart }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


const handleSnackbarClose = () => {
  setOpenSnackbar(false);
};
    
    return (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="95vh" // Set a minimum height to cover the entire viewport height
        >
            <Paper elevation={3} style={{ textAlign: 'center',alignItems: 'center', height: '88vh', width:"750px",display: 'flex', flexDirection: 'column'}}>
            <Typography sx={{ fontSize: '40px', fontWeight: 'bold', marginBottom:"5px" }}>
                        Pantry
                    </Typography>
                <Box style={{ maxWidth: 700, maxHeight: '40vh', marginTop: 20, flex: 1 }}>
                  
                    {Object.keys(pantry).length === 0 && <Typography>Search for ingredients to start </Typography>}
                    {Object.keys(pantry).length > 0 && <List style={{ overflow: 'auto', maxHeight: '100%', border: '2px solid grey', minWidth: 400}}>
                        {Object.keys(pantry).map((elem,i) => {
                            return (
                                <>
                                <ListItem key={i}>
                                    <ListItemText>{elem}</ListItemText>

                                    <ListItemIcon>

                                    {pantry[elem] <= 1 && (
                                            
                                            <ListItemButton onClick={()=>{
                                                addToShoppingCart(elem,1);
                                                setOpenSnackbar(true);
                                                setSnackbarMessage(`${elem} is added to cart.`);

                                                }}>
                                                <AddShoppingCartIcon />
                                            </ListItemButton>
                                        
                                    )}
                                    <Snackbar
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={openSnackbar}
                                    autoHideDuration={2000} // Set the duration for the snackbar (2 seconds in this example)
                                    onClose={handleSnackbarClose}
                                    message="Item added to cart"
                                    >
                                        <MuiAlert
                                            elevation={6}
                                            variant="filled"
                                            severity="success"
                                        >
                                            {snackbarMessage}
                                        </MuiAlert>
                                    </Snackbar>
                                    </ListItemIcon>
                                    
                                    <TextField value={pantry[elem]} onChange={(e)=>updatePantry(elem,e.target.value)}  style={{ width: 80, marginLeft: 20}} InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                {ingredientData[elem]==='none'?'count':ingredientData[elem]==='c'?'cups':ingredientData[elem]}
                                            </InputAdornment>,
                                        }} variant="standard" />
                                    
                                    
                                    
                                    
                                    <ListItemIcon >

                                    
                                        
                                        <ListItemButton onClick={()=>deleteFromPantry(elem)}>
                                            <DeleteIcon/>
                                        </ListItemButton>
                                        

                                    </ListItemIcon>
                                </ListItem>
                                <Divider/>
                                </>
                            )
                        })}
                        
                    </List>}
                </Box>
                <Box style={{flex: 1, marginTop: 20}}>
                    <Autocomplete
                        disablePortal
                        onChange={(e, newVal) => updatePantry(newVal, 0)}
                        options={Object.keys(ingredientData)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Search Ingredients" />}
                    />
                </Box>
            </Paper>
            </Box>
        </>
        
    );
}

export default Pantry;