import PropTypes from 'prop-types';
import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Ingredients from './Ingredients';
import IngredientSteps from './IngredientSteps';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails({ dishOrDrink,
  ingredientsAndMeasures, onFavoriteButtonClick, page, isCopied,
  handleShare }) {
  const isRecipeFavorite = () => {
    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = (storageFavoriteRecipes || [])
      .find((favoriteRecipe) => favoriteRecipe.id === dishOrDrink.idMeal
      || favoriteRecipe.id === dishOrDrink.idDrink);
    return isFavorite;
  };

  return (
    <div className="recipe">
      <img
        data-testid="recipe-photo"
        src={ dishOrDrink.strDrinkThumb || dishOrDrink.strMealThumb }
        alt={ dishOrDrink.strDrink || dishOrDrink.strMealThumb }
        className="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        {dishOrDrink.strDrink || dishOrDrink.strMeal}
      </h1>
      <div className="foodButtons-n-foodType">
        <p
          className="foodType"
          data-testid="recipe-category"
        >
          {dishOrDrink.idMeal ? dishOrDrink.strCategory : dishOrDrink.strAlcoholic}
        </p>
        {isCopied && <span>Link copiado!</span>}
        <div className="foodButtons ">
          <input
            type="image"
            className="foodButton"
            data-testid="share-btn"
            onClick={ () => handleShare() }
            src={ shareIcon }
            alt="Share icon"
          />
          {/* <button
            className="foodButton"
            type="button"
            data-testid="share-btn"
            onClick={ () => handleShare() }
          >
            Compartilhar
          </button> */}
          <input
            type="image"
            className="foodButton"
            onClick={ () => onFavoriteButtonClick() }
            data-testid="favorite-btn"
            src={ !isRecipeFavorite() ? whiteHeartIcon : blackHeartIcon }
            alt={ !isRecipeFavorite() ? 'white heart' : 'black heart' }
          />
        </div>

      </div>
      {!page.includes('in-progress')
        ? <Ingredients ingredientsAndMeasures={ ingredientsAndMeasures } />
        : (
          <IngredientSteps
            ingredientsAndMeasures={ ingredientsAndMeasures }
          />)}

      <p
        className="instructions"
        data-testid="instructions"
      >
        {dishOrDrink.strInstructions}

      </p>
    </div>
  );
}

RecipeDetails.propTypes = {
  dishOrDrink: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string.isRequired,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  handleShare: PropTypes.func.isRequired,
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCopied: PropTypes.bool.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

RecipeDetails.defaultProps = {
  dishOrDrink: PropTypes.shape({
    idMeal: '',
    idDrink: '',
    strAlcoholic: '',
    strMeal: '',
    strDrink: '',
    strDrinkThumb: '',
    strMealThumb: '',
  }),
};

export default RecipeDetails;
