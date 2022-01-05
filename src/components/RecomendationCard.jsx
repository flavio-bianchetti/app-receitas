import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCard({ index, image, nameItem }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        data-testid={ `${index}-recomendation-card-img` }
        src={ image }
        alt={ nameItem }
      />
      <h2 data-testid={ `${index}-recomendation-card-name` }>
        {nameItem}
      </h2>
    </div>
  );
}

RecomendationCard.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  nameItem: PropTypes.string.isRequired,
};

export default RecomendationCard;
