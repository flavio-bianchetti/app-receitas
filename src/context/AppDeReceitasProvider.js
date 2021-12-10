import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import dishesRequest, { dishesByIngredient,
  dishesByName, dishesByLastLetter } from '../services/apiComidas';
import drinksRequest, { drinksByIngredient,
  drinksByName, drinksByLastLetter } from '../services/apiDrinks';

function AppDeReceitasProvider({ children }) {
  const [dishesOrDrinks, setDishesOrDrinks] = useState([]);
  console.log(dishesOrDrinks);
  const handleSearchFoods = (type, value) => {
    if (type === 'search-ingredient') {
      dishesRequest(dishesByIngredient(value), 'meals')
        .then(({ meals }) => (meals ? setDishesOrDrinks(meals) : setDishesOrDrinks([])));
    }

    if (type === 'search-name') {
      dishesRequest(dishesByName(value))
        .then(({ meals }) => (meals ? setDishesOrDrinks(meals) : setDishesOrDrinks([])));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      dishesRequest(dishesByLastLetter(value))
        .then(({ meals }) => (meals ? setDishesOrDrinks(meals) : setDishesOrDrinks([])));
    }
    if (dishesOrDrinks.length === 0) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };
  const handleSearchDrinks = (type, value) => {
    if (type === 'search-ingredient') {
      drinksRequest(drinksByIngredient(value))
        .then(({ drinks }) => (
          drinks ? setDishesOrDrinks(drinks) : setDishesOrDrinks([])));
    }

    if (type === 'search-name') {
      drinksRequest(drinksByName(value))
        .then(({ drinks }) => (
          drinks ? setDishesOrDrinks(drinks) : setDishesOrDrinks([])));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      drinksRequest(drinksByLastLetter(value))
        .then(({ drinks }) => (
          drinks ? setDishesOrDrinks(drinks) : setDishesOrDrinks([])));
    }
    if (dishesOrDrinks.length === 0) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const appReceitasValue = {
    handleSearchFoods,
    handleSearchDrinks,
    dishesOrDrinks,
  };

  return (
    <AppDeReceitasContext.Provider value={ appReceitasValue }>
      {children}
    </AppDeReceitasContext.Provider>
  );
}

AppDeReceitasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppDeReceitasProvider;
