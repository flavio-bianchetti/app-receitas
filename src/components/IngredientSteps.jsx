import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function IngredientSteps({ ingredientsAndMeasures }) {
  const { onChangeProgressRecipe, setProgressRecipes,
    progressRecipes } = useContext(AppDeReceitasContext);
  console.log(progressRecipes);

  const progressRecipesCheckBoxes = ingredientsAndMeasures
    .reduce((acc, { ingredient }) => {
      // acc.recipe = { recipe };
      acc[ingredient] = false;
      return acc;
    }, {});

  useEffect(() => {
    const savedRecipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(savedRecipeProgress);
    setProgressRecipes(progressRecipesCheckBoxes);
    setProgressRecipes(savedRecipeProgress);
  }, []);

  return (
    ingredientsAndMeasures.length > 0 && (
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
    )
  );
}

IngredientSteps.propTypes = {
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientSteps;
