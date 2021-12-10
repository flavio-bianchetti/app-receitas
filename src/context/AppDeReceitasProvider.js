import PropTypes from 'prop-types';
import React from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import dishesRequest, { dishesByIngredient,
  dishesByName, dishesByLastLetter } from '../services/apiComidas';
import drinksRequest, { drinksByIngredient,
  drinksByName, drinksByLastLetter } from '../services/apiDrinks';

function AppDeReceitasProvider({ children }) {
  const handleSearch = (type, value) => {
    if (type === 'search-ingredient') {
      dishesRequest(dishesByIngredient(value))
        .then((da) => console.log(da));
    }

    if (type === 'search-name') {
      dishesRequest(dishesByName(value))
        .then((da) => console.log(da));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      dishesRequest(dishesByLastLetter(value))
        .then((da) => console.log(da));
    }
  };
  const handleSearchDrinks = (type, value) => {
    if (type === 'search-ingredient') {
      drinksRequest(drinksByIngredient(value))
        .then((da) => console.log(da));
    }

    if (type === 'search-name') {
      drinksRequest(drinksByName(value))
        .then((da) => console.log(da));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      drinksRequest(drinksByLastLetter(value))
        .then((da) => console.log(da));
    }
  };

  const appReceitasValue = {
    handleSearch,
    handleSearchDrinks,
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
