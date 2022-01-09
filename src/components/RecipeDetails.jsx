import PropTypes from 'prop-types';
import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Ingredients from './Ingredients';
import IngredientSteps from './IngredientSteps';

function RecipeDetails({ dishOrDrink,
  ingredientsAndMeasures, onFavoriteButtonClick, page, isCopied,
  handleShare }) {
  const isRecipeFavorite = () => {
    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = storageFavoriteRecipes
      .find((favoriteRecipe) => favoriteRecipe.id === dishOrDrink.idMeal
      || favoriteRecipe.id === dishOrDrink.idDrink);
    return isFavorite;
  };

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
        onClick={ () => handleShare() }
      >
        Compartilhar
      </button>
      <button
        type="button"
        onClick={ () => onFavoriteButtonClick() }
      >
        Favoritar
        {!isRecipeFavorite() ? (
          <img
            data-testid="favorite-btn"
            id="white-heart"
            src={ whiteHeartIcon }
            alt="heart"
          />
        ) : <img
          data-testid="favorite-btn"
          id="black-heart"
          src={ blackHeartIcon }
          alt="black heart"
        />}
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
  );
}

RecipeDetails.propTypes = {
  dishOrDrink: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  handleShare: PropTypes.func.isRequired,
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCopied: PropTypes.bool.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  page: PropTypes.shape({
    includes: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeDetails;
