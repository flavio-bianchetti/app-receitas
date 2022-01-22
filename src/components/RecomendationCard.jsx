import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecomendationCard({ index, image, nameItem, id, page }) {
  return (
    <Link to={ `/${page}/${id}` } className="recomendation-card">
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          className="recomendation-img"
          src={ image }
          alt={ nameItem }
        />
        <h1 data-testid={ `${index}-recomendation-title` }>{nameItem}</h1>
      </div>
    </Link>
  );
}

RecomendationCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  nameItem: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default RecomendationCard;
