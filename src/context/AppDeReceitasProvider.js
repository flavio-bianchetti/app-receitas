import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import dishesOrDrinksRequest, { searchByIngredient,
  searchByName, searchByLastLetter } from '../services/apiSearchDrinksNFoods';
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
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  const onChangeProgressRecipe = ({ target }) => {
    const { value: ingredient } = target;
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
      setStorageRecipesProgress(recipes);
    }
  }, []);

  useEffect(() => {
    if (currentIdAndType.id !== '') {
      const newRecipe = storageRecipesProgress;
      newRecipe[currentIdAndType.type][currentIdAndType.id] = progressRecipes;
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
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

  const handleSearchDrinksNFoods = (type, value, url) => {
    if (type === 'search-ingredient') {
      dishesOrDrinksRequest(searchByIngredient(url, value), 'meals')
        .then(({ meals, drinks }) => setDishesOrDrinks(meals || drinks))
        .catch(() => setDishesOrDrinks([]));
    }

    if (type === 'search-name') {
      dishesOrDrinksRequest(searchByName(url, value))
        .then(({ meals, drinks }) => { setDishesOrDrinks(meals || drinks); })
        .catch(() => setDishesOrDrinks([]));
    }

    if (type === 'search-first-letter') {
      if (value.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      dishesOrDrinksRequest(searchByLastLetter(url, value))
        .then(({ meals, drinks }) => setDishesOrDrinks(meals || drinks))
        .catch(() => setDishesOrDrinks([]));
    }
  };

  const appReceitasValue = {
    handleSearchDrinksNFoods,
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
    isRecipeDone,
    setIsRecipeDone,
    isLinkClicked,
    setIsLinkClicked,
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
