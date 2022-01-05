import PropTypes from 'prop-types';
import React from 'react';

function IngredientSteps({ ingredients }) {
  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <label
          key={ ingredient }
          htmlFor={ `${ingredient}-${index}` }
        >
          {ingredient}
          <input
            type="checkbox"
            id={ `${ingredient}-${index}` }
            data-testid={ `${index}-ingredient-step` }
          />
        </label>))}
    </div>
  );
}

IngredientSteps.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientSteps;
