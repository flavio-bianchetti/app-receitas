import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function StartRecipeButton({ dishOrDrink, page, dishOrDrinkId }) {
  const { storageRecipesProgress } = useContext(AppDeReceitasContext);
  const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const mealsOrCocktails = dishOrDrink.idMeal ? 'meals' : 'cocktails';

  const isRecipeInProgressInStorage = Object
    .keys(storageRecipesProgress[mealsOrCocktails])
    .find((id) => id === dishOrDrinkId);

  const isRecipeDoneInStorage = storageDoneRecipes
    .find((doneRecipe) => doneRecipe.id === dishOrDrink.idDrink
    || doneRecipe.id === dishOrDrink.idMeal);

  const history = useHistory();

  const startOrContinueBtn = () => (
    !isRecipeInProgressInStorage ? (
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/${page}/${dishOrDrinkId}/in-progress`) }
      >
        Iniciar Receita
      </button>
    ) : (
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/${page}/${dishOrDrinkId}/in-progress`) }
      >
        Continuar Receita
      </button>
    )
  );

  return (

    isRecipeDoneInStorage ? '' : startOrContinueBtn()
  );
}

StartRecipeButton.propTypes = {
  dishOrDrink: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
  dishOrDrinkId: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default StartRecipeButton;
