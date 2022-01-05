import PropTypes from 'prop-types';
import React from 'react';
import Ingredients from './Ingredients';

function DishOrDrinkRecipeDetails({ dishOrDrink, ingredients }) {
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
      {dishOrDrink.strDrink || dishOrDrink.strMealThumb
        ? <Ingredients ingredients={ ingredients } />
        : ''}

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
