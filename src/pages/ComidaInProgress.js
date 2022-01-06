import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getIngredients, getMeasures } from '../services/ingredientsAndMeasures';
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

  const measures = getMeasures(currentMeal);

  const ingredientsAndMeasures = ingredients.map((ingredient, index) => (
    {
      [ingredient]: measures[index],
    }
  ));

  return (
    <div>
      <DishOrDrinkRecipeDetails
        dishOrDrink={ currentMeal }
        ingredientsAndMeasures={ ingredientsAndMeasures }
      />
    </div>
  );
}

export default ComidaInProgress;
