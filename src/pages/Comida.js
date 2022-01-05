import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecomendationCards from '../components/RecomendationCards';
import dishesRequest, { dishesById } from '../services/apiComidas';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';

function Comida() {
  const [currentMeal, setCurrentMeal] = useState({});

  const history = useHistory();
  const path = history.location.pathname;
  const page = path.split('/')[1];
  const id = path.match(/(\d+)/)[0];

  useEffect(() => {
    dishesRequest(dishesById(id))
      .then(({ meals }) => setCurrentMeal(meals.find((meal) => meal.idMeal === id)));
  }, []);

  console.log(currentMeal);

  const ingredients = Object.keys(currentMeal)
    .filter((key) => key.includes('strIngredient'))
    .map((key) => currentMeal[key])
    .filter((ingredient) => ingredient !== '' && ingredient !== null);

  return (
    <div>
      <DishOrDrinkRecipeDetails
        dishOrDrink={ currentMeal }
        ingredients={ ingredients }
      />
      <video data-testid="video" controls>
        <source src={ currentMeal.strYoutube } />
        <track src="" kind="captions" srcLang="en" label="English" />
      </video>
      <RecomendationCards page={ page } id={ currentMeal.idMeal } />
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Começar receita
      </button>
    </div>
  );
}

export default Comida;
