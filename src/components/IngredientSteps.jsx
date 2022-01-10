import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function IngredientSteps({ ingredientsAndMeasures }) {
  const { onChangeProgressRecipe, setProgressRecipes,
    progressRecipes, currentDishOrDrink,
    setCurrentIdAndType, setIsRecipeButtonEnable } = useContext(AppDeReceitasContext);

  // const { setCurrentDishOrDrink } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  const progressRecipesCheckBoxes = ingredientsAndMeasures
    .reduce((acc, { ingredient }) => {
      acc[ingredient] = false;
      return acc;
    }, {});
  useEffect(() => {
    const isDishOrDrink = currentDishOrDrink.idMeal ? 'meals' : 'cocktails';
    setCurrentIdAndType({ id, type: isDishOrDrink });
    const savedRecipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    console.log(savedRecipeProgress, id, isDishOrDrink);

    const actualRecipe = Object.keys(
      savedRecipeProgress ? savedRecipeProgress[isDishOrDrink] : [],
    )
      .filter((recipeId) => recipeId === id);
    if (actualRecipe.length === 0) {
      setProgressRecipes(progressRecipesCheckBoxes);
    } else {
      const realActualRecipe = savedRecipeProgress[isDishOrDrink][id];
      setProgressRecipes(realActualRecipe);
    }
  }, []);

  useEffect(() => {
    const isActiveButton = Object.values(progressRecipes)
      .every((element) => element === true);
    setIsRecipeButtonEnable(!isActiveButton);
  }, [progressRecipes]);

  return (
    <div className="ingredient-steps">
      {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <div className="ingredient-step" key={ ingredient }>
          <input
            type="checkbox"
            id={ `${ingredient}-${index}` }
            name={ ingredient }
            checked={ progressRecipes[ingredient] }
            onChange={ (e) => onChangeProgressRecipe(e) }
          />
          <label
            htmlFor={ `${ingredient}-${index}` }
            data-testid={ `${index}-ingredient-step` }
            style={
              { textDecoration: progressRecipes[ingredient] ? 'line-through' : 'none' }
            }
          >
            {`${ingredient}: ${measure}`}
          </label>

        </div>
      ))}
    </div>
  );
}

IngredientSteps.propTypes = {
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientSteps;
