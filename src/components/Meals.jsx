import { useEffect, useState } from "react";
import Carousel from "./Carousel";

function MealPlans({ pantry }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [recipeData, setRecipeData] = useState({});

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
                setLoading(false);
            }
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        })
    }

    useEffect(()=>{
        fetchRecipes();
    },[]);

    if(loading) {
        return <div>Loading</div>
    }

    if(error !== '') {
        return <div>{error}</div>
    }

    const breakfastRecipes = getFilteredData('Breakfast');
    const lunchRecipes = getFilteredData('Lunch');
    const dinnerRecipes = getFilteredData('Dinner');

    if(breakfastRecipes.length < 1 || lunchRecipes.length < 1 || dinnerRecipes.length < 1) {
        return <div>Not enough ingredients to make 3 meals for the day!</div>
    }

    function getFilteredData(filterType) {
        const filteredRecipeNames = Object.keys(recipeData).filter((elem)=>recipeData[elem]['type'] === filterType);
        return filteredRecipeNames;
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',  paddingTop:"15vh"  }}>
                    <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px" }}>BREAKFAST</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel recipeNames={getFilteredData('Breakfast')} recipes={recipeData} mealType='b'/>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',  paddingTop:"15vh"  }}>
                    <span style={{writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px" }}>LUNCH</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel recipeNames={getFilteredData('Lunch')} recipes={recipeData} mealType='l'/>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' , paddingTop:"15vh" }}>
                    <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright', fontWeight:800, fontSize:"25px",  }}>DINNER</span>
                </div>
                <div style={{ flex: 1 }}>
                    <Carousel recipeNames={getFilteredData('Dinner')} recipes={recipeData} mealType='d'/>
                </div>
            </div>
        </div>
    );
}

export default MealPlans;