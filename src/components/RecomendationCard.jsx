import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCard({ index, image, nameItem }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        className="recomendation-img"
        src={ image }
        alt={ nameItem }
      />
      <h1 data-testid={ `${index}-recomendation-title` }>{nameItem}</h1>
    </div>
  );
}

RecomendationCard.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  nameItem: PropTypes.string.isRequired,
};

export default RecomendationCard;
