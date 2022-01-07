import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function IngredientSteps({ ingredientsAndMeasures }) {
  const { onChangeProgressRecipe, setProgressRecipes,
    progressRecipes } = useContext(AppDeReceitasContext);

  // const { setCurrentDishOrDrink } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  const progressRecipesCheckBoxes = ingredientsAndMeasures
    .reduce((acc, { ingredient }) => {
      acc[ingredient] = false;
      return acc;
    }, {});
  useEffect(() => {
    const savedRecipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const actualRecipe = savedRecipeProgress
      .find(({ id: recipeId }) => recipeId === id);

    if (!actualRecipe) {
      setProgressRecipes({ ...progressRecipesCheckBoxes, id });
    } else {
      setProgressRecipes(actualRecipe);
    }
  }, []);

  return (
    <div>
      {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <label
          key={ ingredient }
          htmlFor={ `${ingredient}-${index}` }
          data-testid={ `${index}-ingredient-step` }
          style={
            { textDecoration: progressRecipes[ingredient] ? 'line-through' : 'none' }
          }
        >
          {`${ingredient}: ${measure}`}
          <input
            type="checkbox"
            id={ `${ingredient}-${index}` }
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
