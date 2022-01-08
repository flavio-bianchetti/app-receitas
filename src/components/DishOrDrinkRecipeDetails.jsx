import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Ingredients from './Ingredients';
import IngredientSteps from './IngredientSteps';

function DishOrDrinkRecipeDetails({ dishOrDrink, ingredientsAndMeasures }) {
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteFood, setFavoriteFood] = useState(true);
  const history = useHistory();
  const page = history.location.pathname;

  function handleShare() {
    const actualUrl = window.location.href;
    window.navigator.clipboard.writeText(actualUrl);
    setIsCopied(true);
  }

  const onFavoriteButtonClick = () => {
    setFavoriteFood(!favoriteFood);
  };

  return (
    ingredientsAndMeasures.length > 0 && (
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
          onClick={ () => handleShare() }
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => onFavoriteButtonClick() }
        >
          Favoritar
          {!favoriteFood ? (
            <img id="white-heart" src={ whiteHeartIcon } alt="heart" />
          ) : <img id="black-heart" src={ blackHeartIcon } alt="black heart" />}
        </button>
        {isCopied && <span>Link copiado!</span>}
        <p
          data-testid="recipe-category"
        >
          {dishOrDrink.idMeal ? dishOrDrink.strCategory : dishOrDrink.strAlcoholic}

        </p>
        {!page.includes('in-progress')
          ? <Ingredients ingredientsAndMeasures={ ingredientsAndMeasures } />
          : (
            <IngredientSteps
              ingredientsAndMeasures={ ingredientsAndMeasures }
            />)}

        <p data-testid="instructions">{dishOrDrink.strInstructions}</p>
      </div>
    )
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
  strCategory: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strInstructions: PropTypes.string,
  strMealThumb: PropTypes.string,
};

DishOrDrinkRecipeDetails.defaultProps = {
  dishOrDrink: PropTypes.shape({
    strCategory: '',
    strDrink: '',
    strDrinkThumb: '',
    strInstructions: '',
    strMealThumb: '',
  }),

  strCategory: '',
  strDrink: '',
  strDrinkThumb: '',
  strInstructions: '',
  strMealThumb: '',
};

export default DishOrDrinkRecipeDetails;
