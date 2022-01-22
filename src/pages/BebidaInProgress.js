import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { drinksById } from '../services/apiDrinks';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';
import FinishRecipeButton from '../components/FinishRecipeButton';
import HeaderHeader from '../components/HeaderHeader';
import isRecipeInStorage from '../services/isRecipeInStorage';
import RecipeIsDone from '../components/RecipeIsDone';

function BebidaInProgress() {
  const {
    currentDishOrDrink: currentDrink,
    setCurrentDishOrDrink: setCurrentDrink,
    ingredientsAndMeasures, isRecipeDone,
    setIsRecipeDone } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  useEffect(() => {
    let isAPiSubscribed = true;
    dishesOrDrinksRequest(drinksById(id))
      .then(({ drinks }) => isAPiSubscribed && setCurrentDrink(drinks
        .find((drink) => drink.idDrink === id)));
    return () => {
      isAPiSubscribed = false;
    };
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
      JSON.parse(localStorage.getItem('doneRecipes')), currentDrink,
    ) && isAPiSubscribed) {
      setIsRecipeDone(true);
    } else {
      console.log('false');
      setIsRecipeDone(false);
    }
    return () => {
      isAPiSubscribed = false;
    };
  }, [currentDrink]);

  return (
    isRecipeDone ? <RecipeIsDone /> : (
      Object.keys(currentDrink).length > 0 && (
        <div className="pages-background">
          <div className="container">
            <HeaderHeader title="Bebidas" />
            <section className="food-details-container">
              <section className="food-details">
                <DishOrDrinkRecipeDetails
                  dishOrDrink={ currentDrink }
                  ingredientsAndMeasures={ ingredientsAndMeasures }
                />
                <FinishRecipeButton dishOrDrink={ currentDrink } />
              </section>
            </section>
          </div>
        </div>
      )
    )
  );
}

export default BebidaInProgress;
