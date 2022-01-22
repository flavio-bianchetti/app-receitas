import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { dishesById } from '../services/apiComidas';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';
import FinishRecipeButton from '../components/FinishRecipeButton';
import HeaderHeader from '../components/HeaderHeader';
import RecipeIsDone from '../components/RecipeIsDone';
import isRecipeInStorage from '../services/isRecipeInStorage';

function ComidaInProgress() {
  const {
    currentDishOrDrink: currentMeal,
    setCurrentDishOrDrink: setCurrentMeal,
    ingredientsAndMeasures, isRecipeDone,
    setIsRecipeDone } = useContext(AppDeReceitasContext);
  const { id } = useParams();

  useEffect(() => {
    dishesOrDrinksRequest(dishesById(id))
      .then(({ meals }) => setCurrentMeal(meals
        .find((meal) => meal.idMeal === id)));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { cocktails: {}, meals: {} },
      ));
    }
  }, []);

  useEffect(() => {
    let isAPiSubscribed = true;
    if (isRecipeInStorage(
      JSON.parse(localStorage.getItem('doneRecipes')), currentMeal,
    ) && isAPiSubscribed) {
      setIsRecipeDone(true);
    } else {
      console.log('false');
      setIsRecipeDone(false);
    }
    return () => {
      isAPiSubscribed = false;
    };
  }, [currentMeal]);

  return (
    isRecipeDone ? <RecipeIsDone /> : (
      Object.keys(currentMeal).length > 0 && (
        <div className="pages-background">
          <div className="container">
            <HeaderHeader title="Comidas" />
            <section className="food-details-container">
              <section className="food-details">
                <DishOrDrinkRecipeDetails
                  dishOrDrink={ currentMeal }
                  ingredientsAndMeasures={ ingredientsAndMeasures }
                />
                <FinishRecipeButton dishOrDrink={ currentMeal } />
              </section>
            </section>
          </div>
        </div>
      )
    )
  );
}

export default ComidaInProgress;
