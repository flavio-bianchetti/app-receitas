import PropTypes from 'prop-types';
import React from 'react';

function Card({ index, nameItem, image }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ image }
        alt={ nameItem }
      />
      <h2 data-testid={ `${index}-card-name` }>
        {nameItem}
      </h2>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  nameItem: PropTypes.string.isRequired,
};

export default Card;
