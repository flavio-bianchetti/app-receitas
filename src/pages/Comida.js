import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecomendationCards from '../components/RecomendationCards';
import dishesRequest, { dishesById } from '../services/apiComidas';

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
      <img
        data-testid="recipe-photo"
        src={ currentMeal.strMealThumb }
        alt={ currentMeal.strMeal }
      />
      <h1
        data-testid="recipe-title"
      >
        {currentMeal.strMeal}
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
      <p data-testid="recipe-category">{currentMeal.strCategory}</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>))}
      </ul>
      <p data-testid="instructions">{currentMeal.strInstructions}</p>
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
