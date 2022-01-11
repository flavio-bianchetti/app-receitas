import PropTypes from 'prop-types';
import React from 'react';
import RecipeDoneCard from './RecipeDoneCard';

function RecipesDone({ handleClick, filteredDoneRecipes }) {
  return (
    <div className="recipeDone">
      <div className="recipeDone-buttons">
        <button
          data-testid="filter-by-all-btn"
          name="da"
          type="button"
          onClick={ (event) => handleClick(event) }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          name="comida"
          type="button"
          onClick={ (event) => handleClick(event) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="bebida"
          type="button"
          onClick={ (event) => handleClick(event) }
        >
          Drinks
        </button>
      </div>
      {
        filteredDoneRecipes.map((recipe, index) => (
          <RecipeDoneCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        ))
      }
    </div>
  );
}

RecipesDone.propTypes = {
  filteredDoneRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default RecipesDone;
