import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function IngredientSteps({ ingredientsAndMeasures }) {
  const { onChangeProgressRecipe, setProgressRecipes,
    progressRecipes } = useContext(AppDeReceitasContext);

  // const { setCurrentDishOrDrink } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  // useEffect(() => {
  //   drinksRequest(drinksById(id))
  //     .then(({ drinks }) => setCurrentDishOrDrink(drinks
  //       .find((drink) => drink.idDrink === id)));
  // }, []);

  const progressRecipesCheckBoxes = ingredientsAndMeasures
    .reduce((acc, { ingredient }) => {
      acc[ingredient] = false;
      return acc;
    }, {});

  useEffect(() => {
    const savedRecipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const actualRecipe = savedRecipeProgress
      .find(({ id: recipeId }) => recipeId === id);

    console.log(actualRecipe, 'actual recipe');

    if (!actualRecipe) {
      console.log(id, progressRecipesCheckBoxes);

      setProgressRecipes({ ...progressRecipesCheckBoxes, id });
    } else {
      console.log(actualRecipe, 'set actual recipe');
      setProgressRecipes(actualRecipe);
    }
    // console.log(savedRecipeProgress);
  }, []);

  return (
    <div>
      {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <label
          key={ ingredient }
          htmlFor={ `${ingredient}-${index}` }
          style={
            { textDecoration: progressRecipes[ingredient] ? 'line-through' : 'none' }
          }
        >
          {`${ingredient}: ${measure}`}
          <input
            type="checkbox"
            id={ `${ingredient}-${index}` }
            data-testid={ `${index}-ingredient-step` }
            name={ ingredient }
            checked={ progressRecipes[ingredient] }
            onChange={ (e) => onChangeProgressRecipe(e) }
          />
        </label>))}
    </div>
  );
}

IngredientSteps.propTypes = {
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientSteps;
