import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function FavoriteRecipesCard({ recipe, index, unFavorite }) {
  const [isCopied, setIsCopied] = useState(false);

  function handleShare() {
    const currentURL = window.location.href; // Pega a URL atual
    const url = `${currentURL.replace('receitas-favoritas', '')}`
    + `${recipe.type}s/${recipe.id}`; // O replace() vai substituir a parte que contem 'receitas-favoritas' por uma string vazia. Dps será concatenado o tipo da receita passada como paremetro, que foi favoritada, mais seu id.
    window.navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return (
    <div className="recipeDone-card favorite-recipes-card">
      <div className="recipe-info">
        <h1
          data-testid={ `${index}-horizontal-top-text` }
        >
          {
            recipe.alcoholicOrNot === ''
              ? `${recipe.area} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`
          }
        </h1>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { recipe.name }
          </p>
        </Link>
        {
          isCopied && <span>Link copiado!</span>
        }
        <div className="favorite-recipe-share-name-container">
          <input
            type="image"
            name={ recipe.image }
            onClick={ () => handleShare() }
            data-testid={ `${index}-horizontal-share-btn` }
            className="share-icon"
            src={ shareIcon }
            alt="shareIcon"
          />

          <input
            type="image"
            onClick={ (event) => unFavorite(event) }
            data-testid={ `${index}-horizontal-favorite-btn` }
            className="favorite-button"
            src={ blackHeart }
            alt="Desfavoritar"
            name={ recipe.name }
          />
        </div>
      </div>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <input
          type="image"
          className="recipeDoneCard-img"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string.isRequired,
  }),
  unFavorite: PropTypes.func.isRequired,
};

FavoriteRecipesCard.defaultProps = {
  recipe: {
    doneDate: '',
  },
};
