import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import RecipesDone from '../components/RecipesDone';

function RceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  function handleClick(event) {
    const { name } = event.target;
    const getDoneRecipes = doneRecipes.filter((recipe) => (
      recipe.type.includes(name)
    ));
    setFilteredDoneRecipes(getDoneRecipes);
  }

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      const doneRecipeLocalStorage = JSON.parse(localStorage
        .getItem('doneRecipes'));
      setDoneRecipes(doneRecipeLocalStorage);
      setFilteredDoneRecipes(doneRecipeLocalStorage);
    }
  }, []);

  return (
    <div className="pages-background-drink-food">
      <Header title="Receitas Feitas" />
      <section className="recipesDone-container">
        <RecipesDone
          handleClick={ handleClick }
          filteredDoneRecipes={ filteredDoneRecipes }
        />
      </section>
    </div>
  );
}

export default RceitasFeitas;
