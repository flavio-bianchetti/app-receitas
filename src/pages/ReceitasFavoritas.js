import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipes from '../components/FavoriteRecipes';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  function handleClick(event) {
    const { name } = event.target;
    const getFavoriteRecipes = favoriteRecipes.filter((recipe) => (
      recipe.type.includes(name)
    ));
    setFilteredFavoriteRecipes(getFavoriteRecipes);
    console.log(getFavoriteRecipes);
  }

  function unFavorite(event) {
    const { name } = event.target;
    const filteredRecipes = favoriteRecipes.filter((recipe) => (
      recipe.name !== name
    ));
    // setFilteredFavoriteRecipes(filteredRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
    const favoriteRecipesLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    // console.log(favoriteRecipesLocalStorage);
    setFavoriteRecipes(favoriteRecipesLocalStorage);
    setFilteredFavoriteRecipes(favoriteRecipesLocalStorage);
    console.log(filteredRecipes);
  }

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const favoriteRecipesLocalStorage = JSON.parse(localStorage
        .getItem('favoriteRecipes'));
      // console.log(favoriteRecipesLocalStorage);
      setFavoriteRecipes(favoriteRecipesLocalStorage);
      setFilteredFavoriteRecipes(favoriteRecipesLocalStorage);
    }
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="pages-background-drink-food">
        <FavoriteRecipes
          handleClick={ handleClick }
          filteredFavoriteRecipes={ filteredFavoriteRecipes }
          unFavorite={ unFavorite }
        />
      </div>
    </div>
  );
}

export default ReceitasFavoritas;
