import React from 'react';

function SearchFoodsBtn({ title, testid, searchFoodsBtnOnClick, page }) {
  return (
    <div>
      <button
        type="button"
        data-testid={ testid }
        name={ page }
        onClick={ (e) => searchFoodsBtnOnClick(e) }
      >
        {title}
      </button>
    </div>
  );
}

export default SearchFoodsBtn;
