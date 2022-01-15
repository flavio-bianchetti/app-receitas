import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AppDeReceitasContext from './AppDeReceitasContext';
import { dishesIngredientsList } from '../services/apiComidas';
import { drinksIngredientsList } from '../services/apiDrinks';
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
  const [storageDoneRecipes, setStorageDoneRecipes] = useState([]);
  const [listMealsIngredients, setListMealsIngredients] = useState([]);
  const [listDrinksIngredients, setListDrinksIngredients] = useState([]);
  const [isClickedIngredientImage, setIsClickedIngredientImage] = useState(false);

  useEffect(() => {
    dishesOrDrinksRequest(dishesIngredientsList())
      .then(({ meals }) => setListMealsIngredients(meals))
      .catch(() => setListMealsIngredients([]));

    dishesOrDrinksRequest(drinksIngredientsList())
      .then(({ drinks }) => setListDrinksIngredients(drinks))
      .catch(() => setListDrinksIngredients([]));
  }, []);

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
    const { value: ingredient } = target;
    console.log({ ...progressRecipes, [ingredient]: !progressRecipes[ingredient] });
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

    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (currentIdAndType.id !== '') {
      const newRecipe = storageRecipesProgress;
      newRecipe[currentIdAndType.type][currentIdAndType.id] = progressRecipes;
      console.log(newRecipe, progressRecipes);
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
    listMealsIngredients,
    listDrinksIngredients,
    isClickedIngredientImage,
    setIsClickedIngredientImage,
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
