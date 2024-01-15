import { useEffect, useState } from "react";
import Carousel from "./Carousel";

function MealPlans({ pantry, selectedMeals, setSelectedMeals }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [recipeData, setRecipeData] = useState({});

    const [breakfastRecipes, setBreakfastRecipes] = useState([]);
    const [lunchRecipes, setLunchRecipes] = useState([]);
    const [dinnerRecipes, setDinnerRecipes] = useState([]);

    const [recipeIndex, setRecipeIndex] = useState({
        'b':null,
        'l':null,
        'd':null
    });

    function setRecipeIndexAndRecipe(indexObj) {
        setRecipeIndex(indexObj);
        let newSelectedMeals = {
            'b': recipeData[breakfastRecipes[indexObj.b]],
            'l': recipeData[lunchRecipes[indexObj.l]],
            'd': recipeData[dinnerRecipes[indexObj.d]]
        };
        setSelectedMeals(newSelectedMeals);
    }

    function getFilteredData(filterType, data) {
        console.log(data);
        const filteredRecipeNames = Object.keys(data).filter((elem)=>data[elem]['type'] === filterType);
        console.log(filteredRecipeNames)
        return filteredRecipeNames;
    }

    async function fetchRecipes() {
        fetch('https://jnri5eynmrhpwx4y22ixsjxu5i0fvgbg.lambda-url.us-east-2.on.aws/',{
            method: 'POST',
            body: JSON.stringify({
                'ingredients': Object.keys(pantry)
            })
        })
        .then((response)=>{
            if (response.ok) {
                return response.json(); 
              } else if (response.status === 502) {
                throw new Error('502 Bad Gateway');
              } else {
                throw new Error('HTTP Error: ' + response.status);
              }
        })
        .then((data) => {
            if(data) {
                setRecipeData(data);
                setBreakfastRecipes(getFilteredData('Breakfast', data));
                setLunchRecipes(getFilteredData('Lunch', data));
                setDinnerRecipes(getFilteredData('Dinner', data));
                setLoading(false);
            
            let newIndices = {
                'b': Math.floor(getFilteredData('Breakfast', data).length / 2),
                'l': Math.floor(getFilteredData('Lunch', data).length / 2),
                'd': Math.floor(getFilteredData('Dinner', data).length / 2)
            };
            setRecipeIndex(newIndices);
        }
        })
        .catch((error) => {
            console.log(error);
            setError(error);
            setLoading(false);
        })
    }

    useEffect(()=>{
        fetchRecipes();
    },[]);

    if(loading) {
        return <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>Fetching meals based on your pantry</div>
    }

    if(error !== '') {
        return <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>An error occurred while fetching data</div>
    }

    

    if(breakfastRecipes.length < 1 || lunchRecipes.length < 1 || dinnerRecipes.length < 1) {
        return <div>Not enough ingredients to make 3 meals for the day!</div>
    } 

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',  paddingTop:"15vh"  }}>
                    <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px" }}>BREAKFAST</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel recipeNames={breakfastRecipes} recipes={recipeData} mealType='b' recipeIndex={recipeIndex} setRecipeIndex={setRecipeIndexAndRecipe}/>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',  paddingTop:"15vh"  }}>
                    <span style={{writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px" }}>LUNCH</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel recipeNames={lunchRecipes} recipes={recipeData} mealType='l' recipeIndex={recipeIndex} setRecipeIndex={setRecipeIndexAndRecipe}/>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' , paddingTop:"15vh" }}>
                    <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px",  }}>DINNER</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel recipeNames={dinnerRecipes} recipes={recipeData} mealType='d' recipeIndex={recipeIndex} setRecipeIndex={setRecipeIndexAndRecipe}/>
                </div>
            </div>
        </div>
    );
}

export default MealPlans;