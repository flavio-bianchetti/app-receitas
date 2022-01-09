import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';

const getFavoriteRecipe = (dishOrDrink) => {
  const favoriteRecipe = {
    id: dishOrDrink.idMeal || dishOrDrink.idDrink,
    type: dishOrDrink.idMeal ? 'comida' : 'bebida',
    area: dishOrDrink.strArea || '',
    category: dishOrDrink.strCategory,
    alcoholicOrNot: dishOrDrink.strAlcoholic || '',
    name: dishOrDrink.strMeal || dishOrDrink.strDrink,
    image: dishOrDrink.strMealThumb || dishOrDrink.strDrinkThumb,
  };
  return favoriteRecipe;
};

function DishOrDrinkRecipeDetails({ dishOrDrink, ingredientsAndMeasures }) {
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteRecipesStorage, setFavoriteRecipesStorage] = useState([]);
  const history = useHistory();
  const page = history.location.pathname;

  function handleShare() {
    let actualUrl = window.location.href;

    if (actualUrl.includes('in-progress')) {
      actualUrl = actualUrl.split('/');
      actualUrl.pop();
      actualUrl = actualUrl.join('/');
    }
    window.navigator.clipboard.writeText(actualUrl);
    setIsCopied(true);
  }

  const isRecipeInStorage = (storage) => storage
    .find(({ id }) => id === dishOrDrink.idMeal || id === dishOrDrink.idDrink);

  useEffect(() => {
    const favoriteRecipesInStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    setFavoriteRecipesStorage(favoriteRecipesInStorage);
  }, []);

  const onFavoriteButtonClick = () => {
    if (!isRecipeInStorage(favoriteRecipesStorage)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipesStorage, getFavoriteRecipe(dishOrDrink)]));
      setFavoriteRecipesStorage(
        [...favoriteRecipesStorage, getFavoriteRecipe(dishOrDrink)],
      );
    } else {
      const newFavoriteRecipes = favoriteRecipesStorage.filter(({ id }) => (
        id !== dishOrDrink.idMeal && id !== dishOrDrink.idDrink));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavoriteRecipesStorage(newFavoriteRecipes);
    }
  };

  return (
    ingredientsAndMeasures.length > 0 && (
      <RecipeDetails
        onFavoriteButtonClick={ onFavoriteButtonClick }
        // favoriteRecipe={ favoriteRecipe }
        dishOrDrink={ dishOrDrink }
        ingredientsAndMeasures={ ingredientsAndMeasures }
        page={ page }
        isCopied={ isCopied }
        handleShare={ handleShare }
      />
    )
  );
}

DishOrDrinkRecipeDetails.propTypes = {
  dishOrDrink: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }),
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DishOrDrinkRecipeDetails.defaultProps = {
  dishOrDrink: PropTypes.shape({
    idDrink: '',
    idMeal: '',
  }),
};

export default DishOrDrinkRecipeDetails;
