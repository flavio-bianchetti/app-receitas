import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { drinksById } from '../services/apiDrinks';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';
import FinishRecipeButton from '../components/FinishRecipeButton';
import HeaderHeader from '../components/HeaderHeader';

function BebidaInProgress() {
  const {
    currentDishOrDrink: currentDrink,
    setCurrentDishOrDrink: setCurrentDrink,
    ingredientsAndMeasures } = useContext(AppDeReceitasContext);

  const { id } = useParams();

  useEffect(() => {
    dishesOrDrinksRequest(drinksById(id))
      .then(({ drinks }) => setCurrentDrink(drinks
        .find((drink) => drink.idDrink === id)));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { cocktails: {}, meals: {} },
      ));
    }
  }, []);

  return (
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
  );
}

export default BebidaInProgress;
