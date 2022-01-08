import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import dishesRequest, { dishesById } from '../services/apiComidas';
import FinishRecipeButton from '../components/FinishRecipeButton';

function ComidaInProgress() {
  const {
    currentDishOrDrink: currentMeal,
    setCurrentDishOrDrink: setCurrentMeal,
    ingredientsAndMeasures } = useContext(AppDeReceitasContext);
  const { id } = useParams();

  console.log(currentMeal);

  useEffect(() => {
    dishesRequest(dishesById(id))
      .then(({ meals }) => setCurrentMeal(meals
        .find((meal) => meal.idMeal === id)));
  }, []);

  return (
    Object.keys(currentMeal).length > 0 && (
      <div>
        <DishOrDrinkRecipeDetails
          dishOrDrink={ currentMeal }
          ingredientsAndMeasures={ ingredientsAndMeasures }
        />
        <FinishRecipeButton />
      </div>
    )
  );
}

export default ComidaInProgress;
