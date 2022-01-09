import React, { useState, useEffect } from 'react';
import RecipeDoneCard from './RecipeDoneCard';

function RecipesDone() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterDoneRecipes, setFilterDoneRecipes] = useState([]);

  function handleClick(event) {
    const { name } = event.target;
    const getFilterDoneRecipes = doneRecipes.filter((recipe) => (
      recipe.type.includes(name)
    ));
    setFilterDoneRecipes(getFilterDoneRecipes);
  }

  useEffect(() => {
    const doneRecipeLocalStorage = JSON.parse(localStorage
      .getItem('doneRecipes'));
    console.log(doneRecipeLocalStorage);
    setDoneRecipes(doneRecipeLocalStorage);
    setFilterDoneRecipes(doneRecipeLocalStorage);
  }, []);

  return (
    <div>
      <div>
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
        filterDoneRecipes.map((recipe, index) => (
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

export default RecipesDone;
