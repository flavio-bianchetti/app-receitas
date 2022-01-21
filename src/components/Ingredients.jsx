import PropTypes from 'prop-types';
import React from 'react';

function Ingredients({ ingredientsAndMeasures }) {
  return (
    <ul className="ingredients">
      {ingredientsAndMeasures.map(({ ingredient, measure }, index) => (
        <>
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} - ${measure || 'up to you'}`}

          </li>
          <hr />
        </>))}

    </ul>
  );
}

Ingredients.propTypes = {
  ingredientsAndMeasures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ingredients;
