import PropTypes from 'prop-types';
import React from 'react';

function IngredientSteps({ ingredientsAndMeasures }) {
  console.log(ingredientsAndMeasures);
  return (
    <div>
      {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <label
          key={ ingredient }
          htmlFor={ `${ingredient}-${index}` }
        >
          {`${ingredient}: ${measure}`}
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
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientSteps;
