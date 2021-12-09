import PropTypes from 'prop-types';
import React from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import { ingredientRequest,
  nameRequest, firstLetterRequest } from '../services/apiComidas';
import drinksRequest from '../services/apiDrinks';

function AppDeReceitasProvider({ children }) {
  const handleSearch = (type, value) => {
    if (type === 'search-ingredient') {
      ingredientRequest(value)
        .then((da) => console.log(da));
    }

    if (type === 'search-name') {
      nameRequest(value)
        .then((da) => console.log(da));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      firstLetterRequest(value)
        .then((da) => console.log(da));
    }
  };
  const handleSearchDrinks = (type, value) => {
    if (type === 'search-ingredient') {
      drinksRequest(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`)
        .then((da) => console.log(da));
    }

    if (type === 'search-name') {
      drinksRequest(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then((da) => console.log(da));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      drinksRequest(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`)
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
