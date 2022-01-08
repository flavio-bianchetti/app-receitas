import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

const getDoneRecipe = (dishOrDrink) => {
  const today = new Date().toLocaleDateString();
  const doneRecipe = {
    id: dishOrDrink.idMeal || dishOrDrink.idDrink,
    type: dishOrDrink.idMeal ? 'comida' : 'bebida',
    area: dishOrDrink.strArea || '',
    category: dishOrDrink.strCategory,
    alcoholicOrNot: dishOrDrink.strAlcoholic || '',
    name: dishOrDrink.idMeal || dishOrDrink.idDrink,
    image: dishOrDrink.strMealThumb || dishOrDrink.strDrinkThumb,
    doneDate: today,
    tags: dishOrDrink.strTags.split(','),
  };
  return doneRecipe;
};

function FinishRecipeButton({ dishOrDrink }) {
  const [doneRecipesInStorage, setDoneRecipesInStorage] = useState([]);
  // const [doneRecipeSwitch, setDoneRecipeSwitch] = useState(false);
  const { isRecipeButtonEnable } = useContext(AppDeReceitasContext);
  const history = useHistory();

  const isRecipeInStorage = (storage) => storage
    .find(({ id }) => id === dishOrDrink.idMeal || id === dishOrDrink.idDrink);

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      const doneRecipesInStore = JSON.parse(localStorage
        .getItem('doneRecipes'));
      setDoneRecipesInStorage(doneRecipesInStore);
      console.log(doneRecipesInStorage);
    }
  }, []);

  const onFinishRecipe = () => {
    // setDoneRecipeSwitch(!doneRecipeSwitch);
    if (!isRecipeInStorage(doneRecipesInStorage)) {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...doneRecipesInStorage, getDoneRecipe(dishOrDrink)]));
      setDoneRecipesInStorage(
        [...doneRecipesInStorage, getDoneRecipe(dishOrDrink)],
      );
    } else {
      const newDoneRecipes = doneRecipesInStorage.filter(({ id }) => (
        id !== dishOrDrink.idMeal && id !== dishOrDrink.idDrink));
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
      setDoneRecipesInStorage(newDoneRecipes);
    }
    history.push('/receitas-feitas');
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ isRecipeButtonEnable }
      onClick={ () => onFinishRecipe() }
    >
      Finalizar receita
    </button>
  );
}

FinishRecipeButton.propTypes = {
  dishOrDrink: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
};

export default FinishRecipeButton;
