import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getIngredients, getMeasures,
  getingredientsAndMeasures } from '../services/ingredientsAndMeasures';
import drinksRequest, { drinksById } from '../services/apiDrinks';

function BebidaInProgress() {
  const {
    currentDishOrDrink: currentDrink,
    setCurrentDishOrDrink: setCurrentDrink } = useContext(AppDeReceitasContext);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    drinksRequest(drinksById(id))
      .then(({ drinks }) => setCurrentDrink(drinks
        .find((drink) => drink.idDrink === id)));
  }, []);

  const ingredients = getIngredients(currentDrink);

  const measures = getMeasures(currentDrink);

  const ingredientsAndMeasures = getingredientsAndMeasures(ingredients, measures);

  return (
    <div>
      <DishOrDrinkRecipeDetails
        dishOrDrink={ currentDrink }
        ingredientsAndMeasures={ ingredientsAndMeasures }
      />
    </div>
  );
}

export default BebidaInProgress;
