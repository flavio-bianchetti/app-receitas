import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import dishesRequest, { dishesByIngredient,
  dishesByName, dishesByLastLetter } from '../services/apiComidas';
import drinksRequest, { drinksByIngredient,
  drinksByName, drinksByLastLetter } from '../services/apiDrinks';
import { getIngredients, getMeasures,
  getIngredientsAndMeasures } from '../services/ingredientsAndMeasures';

function AppDeReceitasProvider({ children }) {
  const [firstTime, setFirstTime] = useState(true);
  const [dishesOrDrinks, setDishesOrDrinks] = useState([]);
  const [categorieRequest, setCategorieRequest] = useState(false);
  const [currentDishOrDrink, setCurrentDishOrDrink] = useState({});
  const [progressRecipes, setProgressRecipes] = useState({});
  const [currentIdAndType, setCurrentIdAndType] = useState({ id: '', type: '' });
  const [ingredientsAndMeasures, setIngredientAndMeasures] = useState([]);
  const [isRecipeButtonEnable, setIsRecipeButtonEnable] = useState(true);
  const [storageRecipesProgress, setStorageRecipesProgress] = useState(
    { cocktails: {}, meals: {} },
  );
  const [storageDoneRecipes, setStorageDoneRecipes] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify(
        storageDoneRecipes,
      ));
    } else {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setStorageDoneRecipes(recipes);
    }
  }, []);

  const onChangeProgressRecipe = ({ target }) => {
    const { name: ingredient } = target;
    setProgressRecipes(
      { ...progressRecipes, [ingredient]: !progressRecipes[ingredient] },
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        storageRecipesProgress,
      ));
    } else {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(recipes);
      setStorageRecipesProgress(recipes);
    }
  }, []);

  useEffect(() => {
    if (currentIdAndType.id !== '') {
      const isRecipeInStorage = Object.keys(
        storageRecipesProgress[currentIdAndType.type],
      ).find((id) => {
        console.log(id, currentIdAndType.id, 'jdsioasad');
        return id === currentIdAndType.id;
      });

      const newRecipe = storageRecipesProgress;
      newRecipe[currentIdAndType.type][currentIdAndType.id] = progressRecipes;
      console.log(newRecipe, progressRecipes);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));

      console.log(isRecipeInStorage);
    }
  }, [progressRecipes]);

  useEffect(() => {
    if (dishesOrDrinks.length === 0 && !firstTime) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    setFirstTime(false);
  }, [dishesOrDrinks]);

  useEffect(() => {
    const ingredients = getIngredients(currentDishOrDrink);

    const measures = getMeasures(currentDishOrDrink);

    const ingredientsAndMeasuresList = getIngredientsAndMeasures(ingredients, measures);
    setIngredientAndMeasures(ingredientsAndMeasuresList);
  }, [currentDishOrDrink]);

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
    setProgressRecipes,
    progressRecipes,
    onChangeProgressRecipe,
    ingredientsAndMeasures,
    setCurrentIdAndType,
    storageRecipesProgress,
    isRecipeButtonEnable,
    setIsRecipeButtonEnable,
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
