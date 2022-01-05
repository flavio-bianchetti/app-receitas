import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import drinksRequest, { drinksById } from '../services/apiDrinks';
import RecomendationCards from '../components/RecomendationCards';

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
      <img
        data-testid="recipe-photo"
        src={ currentDrink.strDrinkThumb }
        alt={ currentDrink.strDrink }
      />
      <h1
        data-testid="recipe-title"
      >
        {currentDrink.strDrink}
      </h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <p data-testid="recipe-category">{currentDrink.strCategory}</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>))}
      </ul>
      <p data-testid="instructions">{currentDrink.strInstructions}</p>
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
