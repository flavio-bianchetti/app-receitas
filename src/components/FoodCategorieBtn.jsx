import React from 'react';
import { PropTypes } from 'prop-types';

function FoodCategorieBtn({ categoryName, onCategorieButtonClick }) {
  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ () => onCategorieButtonClick(categoryName) }
    >
      {categoryName}
    </button>
  );
}

FoodCategorieBtn.propTypes = {
  categoryName: PropTypes.shape({}).isRequired,
  onCategorieButtonClick: PropTypes.func.isRequired,
};

export default FoodCategorieBtn;
