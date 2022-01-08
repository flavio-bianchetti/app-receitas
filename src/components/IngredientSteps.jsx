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

    const actualRecipe = Object.keys(savedRecipeProgress[isDishOrDrink])
      .filter((recipeId) => recipeId === id);

    console.log(id, actualRecipe);
    console.log(actualRecipe);
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
