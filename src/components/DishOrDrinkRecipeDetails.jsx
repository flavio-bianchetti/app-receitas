import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Ingredients from './Ingredients';
import IngredientSteps from './IngredientSteps';

function DishOrDrinkRecipeDetails({ dishOrDrink, ingredients }) {
  const history = useHistory();
  const page = history.location.pathname;
  console.log(ingredients);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ dishOrDrink.strDrinkThumb || dishOrDrink.strMealThumb }
        alt={ dishOrDrink.strDrink || dishOrDrink.strMealThumb }
      />
      <h1
        data-testid="recipe-title"
      >
        {dishOrDrink.strDrink || dishOrDrink.strMealThumb}
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
      <p
        data-testid="recipe-category"
      >
        {dishOrDrink.strCategory || dishOrDrink.strMealThumb}

      </p>
      {!page.includes('in-progress')
        ? <Ingredients ingredients={ ingredients } />
        : <IngredientSteps ingredients={ ingredients } />}

      <p data-testid="instructions">{dishOrDrink.strInstructions}</p>
    </div>
  );
}

DishOrDrinkRecipeDetails.propTypes = {
  dishOrDrink: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DishOrDrinkRecipeDetails.defaultProps = {
  dishOrDrink: PropTypes.shape({
    strCategory: '',
    strDrink: '',
    strDrinkThumb: '',
    strInstructions: '',
    strMealThumb: '',
  }),
};

export default DishOrDrinkRecipeDetails;
