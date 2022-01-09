import PropTypes from 'prop-types';
import React from 'react';

function IngredientsExplorer({ ingredientsList }) {
  const numMaxIngredients = 12;
  return (
    <div>
      {
        ingredientsList.map((ingredient, index) => (
          index < numMaxIngredients
            && (
              <div
                key={ ingredient.name }
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ ingredient.image }
                  alt={ ingredient.name }
                />
                <span
                  data-testid={ `${index}-card-name` }
                >
                  { ingredient.name }
                </span>
              </div>
            )
        ))
      }
    </div>
  );
}

IngredientsExplorer.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsExplorer;
