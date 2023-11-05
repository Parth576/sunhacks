import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import DonutChart from './chart'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import '../styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { styled } from "@mui/material/styles";


const myArray = [ 20, 25, 30, 35];

function getMin(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Carousel({ recipeNames, recipes, mealType }) {
    const [activeIndex, setActiveIndex] = useState(Math.floor(recipeNames.length / 2)); // Start with the middle slide as active

    const handleSlideChange = (swiper) => {
      setActiveIndex(swiper.activeIndex);
    };

    function getDonutData(recipeName) {
        const recipeData = recipes[recipeName];
        console.log(recipeData);
        const protein = recipeData['protein'];
        const carb = recipeData['carb'];
        const fat = recipeData['fat'];


        const dataForDonutChart = {
            labels: ['Protein', 'Carbohydrates', 'Fat'],
            values: [protein, carb, fat],
            colors: ['#FECDA6', '#FF9130', '#FF5B22'],
          };

          return dataForDonutChart;
    }

    const [openMeals, setOpenMeals] = useState(new Array(recipeNames.length).fill(false));
    

    function handleOpenMeals(i) {
        let newMeals = [...openMeals];
        newMeals[i] = true;
        setOpenMeals(newMeals);
    }

    function handleCloseMeals(i) {
        let newMeals = [...openMeals];
        newMeals[i] = false;
        setOpenMeals(newMeals);
    }
   
  
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        initialSlide={Math.floor(recipeNames.length / 2)}
        onSlideChange={handleSlideChange}
      >
        {recipeNames.map((elem, i) => {
            return (
                <SwiperSlide>
                <Card sx={{ maxWidth: 270,  opacity: activeIndex === i ? 1 : 0.5  }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="120vh"
                        image={'../src/assets/images/' + mealType + (i%3) + '.jpg'}
                    />
                    <CardContentNoPadding style={{ padding: "2px" }} >
                        <Typography gutterBottom variant="h7" component="div">
                            {elem}
                            </Typography>
                            
                    </CardContentNoPadding>
                    <CardActions>
                      
        
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" >
                                <Grid item xs={6}>
                                    <Grid container direction="column">
                                        <Grid item> <AccessTimeFilledIcon style={{height: "15px", width: "15px"}}/>  <span style={{ fontSize: '15px' }}>{getMin(myArray)} Min</span></Grid>
                                        <Grid item> <WhatshotIcon style={{height: "15px", width: "15px"}}/> <span style={{ fontSize: '15px' }}>{recipes[elem]['calories']} Cal</span></Grid>
                                    </Grid>
                                </Grid>
                                
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" size="small" onClick={()=>handleOpenMeals(i)} > <span style={{ fontSize: '15px' }}>Recipe</span></Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={openMeals[i]}
                                    onClose={()=>handleCloseMeals(i)}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                    backdrop: {
                                        timeout: 500,
                                    },
                                    }}
                                >
                                    <Fade in={openMeals[i]}>
                                    <Box sx={style}>
                                        <Typography id="transition-modal-title" variant="h4" component="h4" style={{ marginBottom: '10px' }}>
                                        <span >{elem}</span>
                                        </Typography>
        
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={4}>
                                                    <Grid container direction="column">
                                                        <Grid item> 
                                                            <Typography id="transition-modal-title" variant="h6" component="h6">
                                                                Ingredients
                                                            </Typography> 
                                                            <ul>
                                                                {recipes[elem]['ingredients'].map((ingr,ind)=>{
                                                                    return (
                                                                        <li key={ind}>{ingr}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </Grid>   
                                                    </Grid>
                                                </Grid>
        
                                                <Grid item xs={4}>
                                                    <Typography id="transition-modal-title" variant="h6" component="h6">
                                                    Recipe
                                                    </Typography>
        
                                                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                        <ul>
                                                            {recipes[elem]['recipe'].map((line,ind)=>{
                                                                return (
                                                                    <li key={ind}>{line}</li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Typography>
                                                
                                                </Grid>
        
                                                <Grid item xs={4}>
                                                        <Grid item> 
                                                            <Typography id="transition-modal-title" variant="h6" component="h6">
                                                            Macros
                                                            </Typography>
                                                            <DonutChart data={getDonutData(elem)} />
        
                                                        </Grid>
        
                                                </Grid>
                                            
                                        </Grid>
                                    </Box>
                                    </Fade>
                                </Modal>
                               
                                </Grid>
                            </Grid>
                    </CardActions>
                    </Card>
                 
                </SwiperSlide>
            )
        })}
        {/* <SwiperSlide>
        <Card sx={{ maxWidth: 270,  opacity: activeIndex === 0 ? 1 : 0.5  }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="../src/assets/images/b1.jpg"
            />
            <CardContentNoPadding style={{ padding: "6px" }} >
                <Typography gutterBottom variant="h5" component="div">
                    Meal 1
                    </Typography>
                    
            </CardContentNoPadding>
            <CardActions>
              

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" >
                        <Grid item xs={6}>
                            <Grid container direction="column">
                                <Grid item> <AccessTimeFilledIcon style={{height: "17px", width: "17px"}}/>  <span style={{ fontSize: '17px' }}>30 Min</span></Grid>
                                <Grid item> <WhatshotIcon style={{height: "15px", width: "15px"}}/> <span style={{ fontSize: '17px' }}>200 Cal</span></Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" size="small" onClick={handleOpenMeal1} > <span style={{ fontSize: '17px' }}>Recipe</span></Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openMeal1}
                            onClose={handleCloseMeal1}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                            }}
                        >
                            <Fade in={openMeal1}>
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h4" component="h4" style={{ marginBottom: '10px' }}>
                                <span >Meal 1</span>
                                </Typography>

                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={4}>
                                            <Grid container direction="column">
                                                <Grid item> 
                                                    <Typography id="transition-modal-title" variant="h6" component="h6">
                                                        Ingredients
                                                    </Typography>

                                                  
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>

                                                    </ul>


                                                  
                                                </Grid>

                                                
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography id="transition-modal-title" variant="h6" component="h6">
                                            Recipe
                                            </Typography>

                                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Lorem ipsum dolor sit amet, 
                                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </Typography>
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                                <Grid item> 
                                                    <Typography id="transition-modal-title" variant="h6" component="h6">
                                                    Macros
                                                    </Typography>
                                                    <DonutChart data={dataForDonutChart} />



                                                  
                                                </Grid>

                                        </Grid>
                                    
                                </Grid>
                            </Box>
                            </Fade>
                        </Modal>
                       
                        </Grid>
                    </Grid>
            </CardActions>
            </Card>
         
        </SwiperSlide>

        <SwiperSlide>
        <Card sx={{ maxWidth: 270 ,  opacity: activeIndex === 1 ? 1 : 0.5 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="../src/assets/images/b2.jpg"
            />
            <CardContentNoPadding style={{ padding: "6px" }} >
                <Typography gutterBottom variant="h5" component="div">
                    Meal 2
                    </Typography>
                    
            </CardContentNoPadding>
            <CardActions>
              

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" >
                        <Grid item xs={6}>
                            <Grid container direction="column">
                                <Grid item> <AccessTimeFilledIcon style={{height: "17px", width: "17px"}}/>  <span style={{ fontSize: '17px' }}>30 Min</span></Grid>
                                <Grid item> <WhatshotIcon style={{height: "15px", width: "15px"}}/> <span style={{ fontSize: '17px' }}>200 Cal</span></Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" size="small" onClick={handleOpenMeal2}> <span style={{ fontSize: '17px' }}>Recipe</span></Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openMeal2}
                            onClose={handleCloseMeal2}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                            }}
                        >
                            <Fade in={openMeal2}>
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h4" component="h4" style={{ marginBottom: '10px' }}>
                                <span >Meal 2</span>
                                </Typography>

                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={4}>
                                            <Grid container direction="column">
                                                <Grid item> 
                                                    <Typography id="transition-modal-title" variant="h6" component="h6">
                                                        Ingredients
                                                    </Typography>

                                                  
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>

                                                    </ul>


                                                  
                                                </Grid>

                                                
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography id="transition-modal-title" variant="h6" component="h6">
                                            Recipe
                                            </Typography>

                                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Lorem ipsum dolor sit amet, 
                                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </Typography>
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                                <Grid item> 
                                                    <Typography id="transition-modal-title" variant="h6" component="h6">
                                                    Macros
                                                    </Typography>


                                                    <DonutChart data={dataForDonutChart} />
                                                   
                                                </Grid>

                                        </Grid>
                                    
                                </Grid>
                            </Box>
                            </Fade>
                        </Modal>
                        </Grid>
                    </Grid>
            </CardActions>
            </Card>
        </SwiperSlide>

        <SwiperSlide>
        <Card sx={{ maxWidth: 270,  opacity: activeIndex === 2 ? 1 : 0.5  }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="../src/assets/images/b3.jpg"
            />
            <CardContentNoPadding style={{ padding: "6px" }} >
                <Typography gutterBottom variant="h5" component="div">
                    Meal 3
                    </Typography>
                    
            </CardContentNoPadding>
            <CardActions>
              

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" >
                        <Grid item xs={6}>
                            <Grid container direction="column">
                                <Grid item> <AccessTimeFilledIcon style={{height: "17px", width: "17px"}}/>  <span style={{ fontSize: '17px' }}>30 Min</span></Grid>
                                <Grid item> <WhatshotIcon style={{height: "15px", width: "15px"}}/> <span style={{ fontSize: '17px' }}>200 Cal</span></Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" size="small" onClick={handleOpenMeal3}> <span style={{ fontSize: '17px' }}>Recipe</span></Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openMeal3}
                            onClose={handleCloseMeal3}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                            }}
                        >
                            <Fade in={openMeal3}>
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h4" component="h4" style={{ marginBottom: '10px' }}>
                                <span >Meal 3</span>
                                </Typography>

                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={4}>
                                            <Grid container direction="column">
                                                <Grid item> 
                                                    <Typography id="transition-modal-title" variant="h6" component="h6">
                                                        Ingredients
                                                    </Typography>

                                                  
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>

                                                    </ul>


                                                  
                                                </Grid>

                                                
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography id="transition-modal-title" variant="h6" component="h6">
                                            Recipe
                                            </Typography>

                                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Lorem ipsum dolor sit amet, 
                                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </Typography>
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                                <Grid item> 
                                                    <Typography id="transition-modal-title" variant="h6" component="h6">
                                                    Macros
                                                    </Typography>
                                                    <DonutChart data={dataForDonutChart} />


                                                </Grid>

                                        </Grid>
                                    
                                </Grid>
                            </Box>
                            </Fade>
                        </Modal>
                        </Grid>
                    </Grid>
            </CardActions>
            </Card>
        </SwiperSlide> */}

      </Swiper>
    </>
  );
}
