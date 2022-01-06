import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Ingredients from './Ingredients';
import IngredientSteps from './IngredientSteps';

function DishOrDrinkRecipeDetails({ dishOrDrink, ingredientsAndMeasures }) {
  const history = useHistory();
  const page = history.location.pathname;

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
        {dishOrDrink.strDrink || dishOrDrink.strMeal}
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
        {dishOrDrink.idMeal ? dishOrDrink.strCategory : dishOrDrink.strAlcoholic}

      </p>
      {!page.includes('in-progress')
        ? <Ingredients ingredientsAndMeasures={ ingredientsAndMeasures } />
        : <IngredientSteps ingredientsAndMeasures={ ingredientsAndMeasures } />}

      <p data-testid="instructions">{dishOrDrink.strInstructions}</p>
    </div>
  );
}

DishOrDrinkRecipeDetails.propTypes = {
  dishOrDrink: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
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
