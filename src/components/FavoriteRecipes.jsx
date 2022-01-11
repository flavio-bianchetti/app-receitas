import React from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipesCard from './FavoriteRecipesCard';

function FavoriteRecipes({ handleClick, filteredFavoriteRecipes, unFavorite }) {
  return (
    <div className="favorite-recipes-container">
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
      <div className="favorite-recipes-card-container">
        {
          filteredFavoriteRecipes.map((recipe, index) => (
            <FavoriteRecipesCard
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
              unFavorite={ unFavorite }
            />
          ))
        }
      </div>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  filteredFavoriteRecipes: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  unFavorite: PropTypes.func.isRequired,
};

export default FavoriteRecipes;
