import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteRecipesCard({ recipe, index }) {
  const [isCopied, setIsCopied] = useState(false);

  function handleShare() {
    const actualUrl = window.location.href;
    const url = `${actualUrl.replace('receitas-feitas', '')}`
    + `${recipe.type}s/${recipe.id}`;
    window.navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return (
    <div>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ `${recipe.name}` }
        />
      </Link>
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
      <button
        type="button"
        name={ recipe.image }
        onClick={ () => handleShare() }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          className="share-icon"
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>
      {
        isCopied && <span>Link copiado!</span>
      }
      <button
        type="button"
        name={ recipe.image }
        onClick={ () => handleShare() }
        data-testid={ `${index}-horizontal-favorite-btn` }
        className="favorite-button"
      >
        Favoritar
      </button>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  index: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string.isRequired,
  }).isRequired,
};
