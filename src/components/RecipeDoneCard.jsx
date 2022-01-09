import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function RecipeDoneCard({ recipe, index }) {
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
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </p>
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
      {
        (recipe.tags).map((tagName) => (
          <button
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            type="button"
          >
            { tagName }
          </button>
        ))
      }
    </div>
  );
}

RecipeDoneCard.propTypes = {
  index: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape({
      map: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

RecipeDoneCard.defaultProps = {
  recipe: PropTypes.shape({
    type: '',
    id: '',
    alcoholicOrNot: '',
    area: '',
    category: '',
    doneDate: '',
    image: '',
    name: '',
    tags: [],
  }),
};

export default RecipeDoneCard;
