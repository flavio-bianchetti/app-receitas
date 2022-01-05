import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import getIngredients from '../services/getIngredients';
import dishesRequest, { dishesById } from '../services/apiComidas';

function ComidaInProgress() {
  const {
    currentDishOrDrink: currentMeal,
    setCurrentDishOrDrink: setCurrentMeal } = useContext(AppDeReceitasContext);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dishesRequest(dishesById(id))
      .then(({ meals }) => setCurrentMeal(meals
        .find((meal) => meal.idMeal === id)));
  }, []);

  const ingredients = getIngredients(currentMeal);

  return (
    <div>
      <DishOrDrinkRecipeDetails
        dishOrDrink={ currentMeal }
        ingredients={ ingredients }
      />
    </div>
  );
}

export default ComidaInProgress;
