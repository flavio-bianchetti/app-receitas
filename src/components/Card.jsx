import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({ index, nameItem, image, item }) {
  return (
    <Link
      className="card"
      to={ `/${item.idDrink ? 'bebidas' : 'comidas'}/${item.idDrink || item.idMeal}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >
        <div className="card-image-container">
          <img
            data-testid={ `${index}-card-img` }
            src={ image }
            alt={ nameItem }
          />
        </div>
        <div className="cardTitle-container">
          <h2 data-testid={ `${index}-card-name` }>
            {nameItem}
          </h2>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }),
  nameItem: PropTypes.string.isRequired,
};

Card.defaultProps = {
  item: PropTypes.shape({
    idDrink: '',
    idMeal: '',
  }),
};

export default Card;
