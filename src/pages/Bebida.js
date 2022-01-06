import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import drinksRequest, { drinksById } from '../services/apiDrinks';
import RecomendationCards from '../components/RecomendationCards';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getIngredients, getMeasures,
  getingredientsAndMeasures } from '../services/ingredientsAndMeasures';
import StartRecipeButton from '../components/StartRecipeButton';

function Bebida() {
  const {
    currentDishOrDrink: currentDrink,
    setCurrentDishOrDrink: setCurrentDrink,
    ingredientsAndMeasures } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  // const history = useHistory();
  // const path = history.location.pathname;
  // const page = path.split('/')[1];
  // const id = path.match(/(\d+)/)[0];

  useEffect(() => {
    drinksRequest(drinksById(id))
      .then(({ drinks }) => setCurrentDrink(drinks
        .find((drink) => drink.idDrink === id)));
  }, []);

  return (
    'idDrink' in currentDrink && (
      <div>
        <DishOrDrinkRecipeDetails
          dishOrDrink={ currentDrink }
          ingredientsAndMeasures={ ingredientsAndMeasures }
        />
        <RecomendationCards page="bebidas" id={ currentDrink.iDrink } />
        <StartRecipeButton dishOrDrink={ currentDrink } drink="bebida" />
      </div>
    )
  );
}

export default Bebida;
