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
    console.log(getDoneRecipes);
    setFilteredDoneRecipes(getDoneRecipes);
  }

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      const doneRecipeLocalStorage = JSON.parse(localStorage
        .getItem('doneRecipes'));
      console.log(doneRecipeLocalStorage);
      setDoneRecipes(doneRecipeLocalStorage);
      setFilteredDoneRecipes(doneRecipeLocalStorage);
    }
  }, []);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <RecipesDone
        handleClick={ handleClick }
        filteredDoneRecipes={ filteredDoneRecipes }
      />
    </div>
  );
}

export default RceitasFeitas;
