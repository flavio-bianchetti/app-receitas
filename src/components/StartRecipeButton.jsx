import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function StartRecipeButton({ dishOrDrink, meal, drink }) {
  // const [recipe, setRecipe] = useState([]);

  const { storageRecipesProgress } = useContext(AppDeReceitasContext);
  console.log(storageRecipesProgress);
  // const history = useHistory();

  // const storage = localStorage;
  // const today = new Date().toLocaleDateString();

  // useEffect(() => {
  //   storage.setItem('doneRecipe', '');
  // }, []);

  // const doneRecipe = [{
  //   id: dishOrDrink.idMeal || dishOrDrink.idDrink,
  //   type: meal || drink,
  //   area: dishOrDrink.strArea,
  //   category: dishOrDrink.strCategory,
  //   alcoholicOrNot: dishOrDrink.strAlcoholic,
  //   name: dishOrDrink.strMeal || dishOrDrink.strDrink,
  //   image: dishOrDrink.strMealThumb || dishOrDrink.strDrinkThumb,
  //   doneDate: today,
  //   tags: dishOrDrink.strTags,
  // }];

  // const inProgressRecipes = {
  //   meals: {
  //     [dishOrDrink.idMeal]: [],
  //   },
  //   cocktails: {
  //     [dishOrDrink.idDrink]: [],
  //   },
  // };

  // function handleClick() {
  //   setRecipe([...recipe, doneRecipe]);
  //   storage.setItem('doneRecipe', JSON.stringify(doneRecipe));
  //   storage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  //   history
  //     .push(`/${meal
  //       || drink}s/${dishOrDrink.idMeal
  //       || dishOrDrink.idDrink}/in-progress`);
  // }

  // const storageRecipeInProgress = storage.getItem('inProgressRecipes');

  if (true) {
    return (
      <div>
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </div>
    );
  }

  if (false) {
    return (
      <div>
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"

        >
          Continuar Receita
        </button>
      </div>
    );
  }
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
  drink: PropTypes.string.isRequired,
  meal: PropTypes.string.isRequired,
};

export default StartRecipeButton;
