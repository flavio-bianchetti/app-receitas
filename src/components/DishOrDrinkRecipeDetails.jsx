import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';

const getDoneRecipe = (dishOrDrink) => {
  console.log(dishOrDrink);
  const doneRecipe = {
    id: dishOrDrink.idMeal || dishOrDrink.idDrink,
    type: dishOrDrink.idMeal ? 'comida' : 'bebida',
    area: dishOrDrink.strArea || '',
    category: dishOrDrink.strCategory,
    alcoholicOrNot: dishOrDrink.strAlcoholic || '',
    name: dishOrDrink.strMeal || dishOrDrink.strDrink,
    image: dishOrDrink.strMealThumb || dishOrDrink.strDrinkThumb,
  };
  return doneRecipe;
};

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

  const isRecipeInStorage = (storage) => storage
    .find(({ id }) => {
      console.log(dishOrDrink);
      return id === dishOrDrink.idMeal || id === dishOrDrink.idDrink;
    });
  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const favoriteRecipesInStorage = JSON.parse(localStorage
        .getItem('favoriteRecipes'));
      setFavoriteRecipesStorage(favoriteRecipesInStorage);
      if (isRecipeInStorage(favoriteRecipesInStorage)) {
        console.log('c');
        setFavoriteRecipe(true);
      }
    }
  }, []);
  const onFavoriteButtonClick = () => {
    setFavoriteRecipe(!favoriteRecipe);

    if (!isRecipeInStorage(favoriteRecipesStorage)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipesStorage, getDoneRecipe(dishOrDrink)]));
      setFavoriteRecipesStorage([...favoriteRecipesStorage, getDoneRecipe(dishOrDrink)]);
      console.log('a');
    } else {
      const newFavoriteRecipes = favoriteRecipesStorage.filter(({ id }) => (
        id !== dishOrDrink.idMeal && id !== dishOrDrink.idDrink));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavoriteRecipesStorage(newFavoriteRecipes);
      console.log('b');
    }
  };

  return (
    ingredientsAndMeasures.length > 0 && (
      <RecipeDetails
        onFavoriteButtonClick={ onFavoriteButtonClick }
        favoriteRecipe={ favoriteRecipe }
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
