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
      dishesRequest(dishesByIngredient(value))
        .then(({ meals }) => setDishesOrDrinks(meals));
    }

    if (type === 'search-name') {
      dishesRequest(dishesByName(value))
        .then(({ meals }) => setDishesOrDrinks(meals));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      dishesRequest(dishesByLastLetter(value))
        .then(({ meals }) => setDishesOrDrinks(meals));
    }
  };
  const handleSearchDrinks = (type, value) => {
    if (type === 'search-ingredient') {
      drinksRequest(drinksByIngredient(value))
        .then(({ drinks }) => setDishesOrDrinks(drinks));
    }

    if (type === 'search-name') {
      drinksRequest(drinksByName(value))
        .then(({ drinks }) => setDishesOrDrinks(drinks));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      drinksRequest(drinksByLastLetter(value))
        .then(({ drinks }) => setDishesOrDrinks(drinks));
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
