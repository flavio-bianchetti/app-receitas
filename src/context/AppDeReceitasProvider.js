import React from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import { ingredientRequest, nameRequest, firstLetterRequest } from '../services/apiComidas';

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
      if (value.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter');
      firstLetterRequest(value)
        .then((da) => console.log(da));
    }
  };

  const appReceitasValue = {
    handleSearch,
  };

  return (
    <AppDeReceitasContext.Provider value={ appReceitasValue }>
      {children}
    </AppDeReceitasContext.Provider>
  );
}

export default AppDeReceitasProvider;
