import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function IngredientSteps({ ingredientsAndMeasures }) {
  const { onChangeProgressRecipe, setProgressRecipes,
    progressRecipes, currentDishOrDrink,
    setCurrentIdAndType, setIsRecipeButtonEnable } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  const ingredients = {};

  let sameIngredientCheckBoxes = 1;
  ingredientsAndMeasures = ingredientsAndMeasures.map((ingredientAndMeasure, i) => {
    const { ingredient } = ingredientAndMeasure;
    if (!ingredients[ingredient]) {
      ingredients[ingredient] = i;
      return ingredientAndMeasure;
    }
    ingredientAndMeasure.ingredient = `${ingredient}-${sameIngredientCheckBoxes}`;
    sameIngredientCheckBoxes += 1;

    return ingredientAndMeasure;
  });

  const progressRecipesCheckBoxes = ingredientsAndMeasures
    .reduce((acc, { ingredient }) => {
      if (acc[ingredient]) {
        acc[`${ingredient}`] = false;
      } else {
        acc[ingredient] = false;
      }
      return acc;
    }, {});
  useEffect(() => {
    const isDishOrDrink = currentDishOrDrink.idMeal ? 'meals' : 'cocktails';
    setCurrentIdAndType({ id, type: isDishOrDrink });
    const savedRecipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

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
          <label
            htmlFor={ `${ingredient}-${index}` }
            style={
              { textDecoration: progressRecipes[ingredient] ? 'line-through' : 'none' }
            }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${ingredient}-${index}` }
              name={ ingredient }
              value={ ingredient }
              defaultChecked={ progressRecipes[ingredient] }
              onChange={ (e) => onChangeProgressRecipe(e) }
            />
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
