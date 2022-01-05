import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import drinksRequest, { drinksById } from '../services/apiDrinks';
import RecomendationCards from '../components/RecomendationCards';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import getIngredients from '../services/getIngredients';

function Bebida() {
  const {
    currentDishOrDrink: currentDrink,
    setCurrentDishOrDrink: setCurrentDrink } = useContext(AppDeReceitasContext);

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

  const ingredients = getIngredients(currentDrink);

  return (
    'idDrink' in currentDrink && (
      <div>
        <DishOrDrinkRecipeDetails
          dishOrDrink={ currentDrink }
          ingredients={ ingredients }
        />
        <RecomendationCards page="bebidas" id={ currentDrink.iDrink } />
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Começar receita
        </button>
      </div>
    )
  );
}

export default Bebida;
