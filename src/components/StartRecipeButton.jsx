import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function StartRecipeButton({ dishOrDrink, page, dishOrDrinkId }) {
  const { storageRecipesProgress } = useContext(AppDeReceitasContext);

  const mealsOrCocktails = dishOrDrink.idMeal ? 'meals' : 'cocktails';

  const isRecipeInStorage = Object.keys(storageRecipesProgress[mealsOrCocktails])
    .find((id) => {
      console.log(id, dishOrDrinkId);
      return id === dishOrDrinkId;
    });
  const history = useHistory();

  return (
    <div>
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/${page}/${dishOrDrinkId}/in-progress`) }
      >
        {isRecipeInStorage ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </div>
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
