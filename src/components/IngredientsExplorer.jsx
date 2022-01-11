import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function IngredientsExplorer({ ingredientsList, imageUrl, path }) {
  const { handleSearchFoods, setIsClickedIngredientImage,
    handleSearchDrinks } = useContext(AppDeReceitasContext);
  const numMaxIngredients = 12;

  function handleClickLink(ingredient) {
    if (path === '/comidas') {
      handleSearchFoods('search-ingredient', ingredient.strIngredient);
    } else {
      handleSearchDrinks('search-ingredient', ingredient.strIngredient1);
    }
    setIsClickedIngredientImage(true);
  }

  return (
    <div className="explore-food-cards-container">
      {
        ingredientsList.map((ingredient, index) => (
          index < numMaxIngredients
            && (
              <div className="explore-food-card-container">
                <Link
                  to={ path }
                  onClick={ () => handleClickLink(ingredient) }
                >
                  <div
                    className="explore-food-card"
                    key={ ingredient.strIngredient || ingredient.strIngredient1 }
                    data-testid={ `${index}-ingredient-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={
                        `${imageUrl}${ingredient.strIngredient
                        || ingredient.strIngredient1}-Small.png`
                      }
                      alt={ ingredient.strIngredient || ingredient.strIngredient1 }
                    />
                    <h2
                      data-testid={ `${index}-card-name` }
                    >
                      { ingredient.strIngredient || ingredient.strIngredient1 }
                    </h2>
                  </div>
                </Link>
              </div>
            )
        ))
      }
    </div>
  );
}

IngredientsExplorer.propTypes = {
  ingredientsList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string,
    ),
  ).isRequired,
  imageUrl: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default IngredientsExplorer;
