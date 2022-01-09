import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import drinksRequest, { drinksById } from '../services/apiDrinks';
import FinishRecipeButton from '../components/FinishRecipeButton';

function BebidaInProgress() {
  const {
    currentDishOrDrink: currentDrink,
    setCurrentDishOrDrink: setCurrentDrink,
    ingredientsAndMeasures } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  useEffect(() => {
    drinksRequest(drinksById(id))
      .then(({ drinks }) => setCurrentDrink(drinks
        .find((drink) => drink.idDrink === id)));
  }, []);

  return (
    Object.keys(currentDrink).length > 0 && (
      <div>
        <DishOrDrinkRecipeDetails
          dishOrDrink={ currentDrink }
          ingredientsAndMeasures={ ingredientsAndMeasures }
        />
        <FinishRecipeButton dishOrDrink={ currentDrink } />
      </div>
    )
  );
}

export default BebidaInProgress;
