import React from 'react';

function StartRecipeButton({ dishOrDrink, meal, drink }) {
  const storage = localStorage;
  const today = new Date().toLocaleDateString();

  const doneRecipe = [{
    id: dishOrDrink.idMeal || dishOrDrink.idDrink,
    type: meal || drink,
    area: dishOrDrink.strArea,
    category: dishOrDrink.strCategory,
    alcoholicOrNot: dishOrDrink.strAlcoholic,
    name: dishOrDrink.strMeal || dishOrDrink.strDrink,
    image: dishOrDrink.strMealThumb || dishOrDrink.strDrinkThumb,
    doneDate: today,
    tags: dishOrDrink.strTags,
  }];

  function handleClick() {
    storage.setItem('doneRecipes', JSON.stringify(doneRecipe));
  }

  return (
    <div>
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleClick() }
      >
        Começar receita
      </button>
    </div>
  );
}

export default StartRecipeButton;
