import PropTypes from 'prop-types';
import React from 'react';

function Ingredients({ ingredientsAndMeasures }) {
  return (
    <ul>
      {ingredientsAndMeasures.map((obj, index) => (
        <li
          key={ Object.keys(obj) }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {Object.entries(obj).join().replace(',', ': ')}
        </li>))}
    </ul>
  );
}

Ingredients.propTypes = {
  ingredientsAndMeasures: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ingredients;
