import PropTypes from 'prop-types';
import React from 'react';

function Ingredients({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>))}
    </ul>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ingredients;
