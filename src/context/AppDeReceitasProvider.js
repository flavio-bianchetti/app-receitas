import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import dishesRequest, { dishesByIngredient,
  dishesByName, dishesByLastLetter } from '../services/apiComidas';
import drinksRequest, { drinksByIngredient,
  drinksByName, drinksByLastLetter } from '../services/apiDrinks';

function AppDeReceitasProvider({ children }) {
  const [firstTime, setFirstTime] = useState(true);
  const [dishesOrDrinks, setDishesOrDrinks] = useState([]);
  const [categorieRequest, setCategorieRequest] = useState(false);
  const [currentDishOrDrink, setCurrentDishOrDrink] = useState({});

  useEffect(() => {
    if (dishesOrDrinks.length === 0 && !firstTime) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    setFirstTime(false);
  }, [dishesOrDrinks]);
  const handleSearchFoods = (type, value) => {
    if (type === 'search-ingredient') {
      dishesRequest(dishesByIngredient(value), 'meals')
        .then(({ meals }) => setDishesOrDrinks(meals))
        .catch(() => setDishesOrDrinks([]));
    }

    if (type === 'search-name') {
      dishesRequest(dishesByName(value))
        .then(({ meals }) => setDishesOrDrinks(meals))
        .catch(() => setDishesOrDrinks([]));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      dishesRequest(dishesByLastLetter(value))
        .then(({ meals }) => setDishesOrDrinks(meals))
        .catch(() => setDishesOrDrinks([]));
    }
  };
  const handleSearchDrinks = async (type, value) => {
    if (type === 'search-ingredient') {
      drinksRequest(drinksByIngredient(value))
        .then(({ drinks }) => setDishesOrDrinks(drinks))
        .catch(() => setDishesOrDrinks([]));
    }

    if (type === 'search-name') {
      drinksRequest(drinksByName(value))
        .then(({ drinks }) => (
          setDishesOrDrinks(drinks)))
        .catch(() => setDishesOrDrinks([]));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      drinksRequest(drinksByLastLetter(value))
        .then(({ drinks }) => (
          setDishesOrDrinks(drinks)))
        .catch(() => setDishesOrDrinks([]));
    }
    // drinksRequest(drinksByIngredient('dsad')).then((drinks) => console.log(drinks));
  };

  const appReceitasValue = {
    handleSearchFoods,
    handleSearchDrinks,
    dishesOrDrinks,
    setDishesOrDrinks,
    categorieRequest,
    setCategorieRequest,
    currentDishOrDrink,
    setCurrentDishOrDrink,
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
