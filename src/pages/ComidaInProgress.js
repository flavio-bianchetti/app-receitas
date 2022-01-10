import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import dishesRequest, { dishesById } from '../services/apiComidas';
import FinishRecipeButton from '../components/FinishRecipeButton';
import HeaderHeader from '../components/HeaderHeader';

function ComidaInProgress() {
  const {
    currentDishOrDrink: currentMeal,
    setCurrentDishOrDrink: setCurrentMeal,
    ingredientsAndMeasures } = useContext(AppDeReceitasContext);
  const { id } = useParams();

  console.log(currentMeal);

  useEffect(() => {
    dishesRequest(dishesById(id))
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

  return (
    Object.keys(currentMeal).length > 0 && (
      <div className="pages-background-drink-food">
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
    )
  );
}

export default ComidaInProgress;
