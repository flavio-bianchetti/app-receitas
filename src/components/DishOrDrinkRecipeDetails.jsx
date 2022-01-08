import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Ingredients from './Ingredients';
import IngredientSteps from './IngredientSteps';

function DishOrDrinkRecipeDetails({ dishOrDrink, ingredientsAndMeasures }) {
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [favoriteRecipesStorage, setFavoriteRecipesStorage] = useState([]);
  const history = useHistory();
  const page = history.location.pathname;

  function handleShare() {
    const actualUrl = window.location.href;
    window.navigator.clipboard.writeText(actualUrl);
    setIsCopied(true);
  }

  const doneRecipe = {
    id: dishOrDrink.idMeal || dishOrDrink.idDrink,
    type: dishOrDrink.idMeal ? 'comida' : 'bebida',
    area: dishOrDrink.strArea || '',
    category: dishOrDrink.strCategory,
    alcoholicOrNot: dishOrDrink.strAlcoholic || '',
    name: dishOrDrink.strMeal || dishOrDrink.strDrink,
    image: dishOrDrink.strMealThumb || dishOrDrink.strDrinkThumb,
  };

  const isRecipeInStorage = (storage) => storage
    .find(({ id }) => id === dishOrDrink.idMeal || id === dishOrDrink.idDrink);
  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const favoriteRecipesInStorage = JSON.parse(localStorage
        .getItem('favoriteRecipes'));
      setFavoriteRecipesStorage(favoriteRecipesInStorage);
      if (isRecipeInStorage(favoriteRecipesInStorage)) {
        console.log('c');
        setFavoriteRecipe(!favoriteRecipe);
      }
    }
  }, []);
  const onFavoriteButtonClick = () => {
    setFavoriteRecipe(!favoriteRecipe);

    if (!isRecipeInStorage(favoriteRecipesStorage)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipesStorage, doneRecipe]));
      console.log('a');
      setFavoriteRecipesStorage([...favoriteRecipesStorage, doneRecipe]);
    } else {
      console.log('b');
      const newFavoriteRecipes = favoriteRecipesStorage.filter(({ id }) => (
        id !== dishOrDrink.idMeal && id !== dishOrDrink.idDrink));
      console.log(newFavoriteRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavoriteRecipesStorage(newFavoriteRecipes);
    }
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
          onClick={ () => onFavoriteButtonClick() }
        >
          Favoritar
          {!favoriteRecipe ? (
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
