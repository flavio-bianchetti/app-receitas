import React from 'react';
import { PropTypes } from 'prop-types';

function FoodCategorieBtn({ categoryName, onCategorieButtonClick }) {
  return (
    <button
      className="foodCategoryBtn"
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ () => onCategorieButtonClick(categoryName) }
    >
      {categoryName === 'Other/Unknown'
        ? 'Other / Unknown' : categoryName}
    </button>
  );
}

FoodCategorieBtn.propTypes = {
  categoryName: PropTypes.string.isRequired,
  onCategorieButtonClick: PropTypes.func.isRequired,
};

export default FoodCategorieBtn;
