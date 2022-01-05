import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import drinksRequest, { drinksById } from '../services/apiDrinks';
import RecomendationCards from '../components/RecomendationCards';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';

function Bebida() {
  const [currentDrink, setCurrentDrink] = useState({});

  const history = useHistory();
  const path = history.location.pathname;
  const page = path.split('/')[1];
  const id = path.match(/(\d+)/)[0];

  useEffect(() => {
    drinksRequest(drinksById(id))
      .then(({ drinks }) => setCurrentDrink(drinks
        .find((drink) => drink.idDrink === id)));
  }, []);

  const ingredients = Object.keys(currentDrink)
    .filter((key) => key.includes('strIngredient'))
    .map((key) => currentDrink[key])
    .filter((ingredient) => ingredient !== '' && ingredient !== null);

  return (
    <div>
      <DishOrDrinkRecipeDetails
        dishOrDrink={ currentDrink }
        ingredients={ ingredients }
      />
      <RecomendationCards page={ page } id={ currentDrink.iDrink } />
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Começar receita
      </button>
    </div>
  );
}

export default Bebida;
