import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import drinksRequest, { drinksById } from '../services/apiDrinks';
import RecomendationCards from '../components/RecomendationCards';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import StartRecipeButton from '../components/StartRecipeButton';
import HeaderHeader from '../components/HeaderHeader';

function Bebida() {
  const {
    currentDishOrDrink: currentDrink,
    setCurrentDishOrDrink: setCurrentDrink,
    ingredientsAndMeasures } = useContext(AppDeReceitasContext);

  const { id } = useParams();
  console.log(id, currentDrink.idDrink);

  useEffect(() => {
    drinksRequest(drinksById(id))
      .then(({ drinks }) => setCurrentDrink(drinks
        .find((drink) => drink.idDrink === id)));
  }, []);

  return (
    Object.keys(currentDrink).length > 0 && (
      <div className="pages-background ">
        <HeaderHeader title="Bebidas" />
        <section className="food-details-container">
          <section className="food-details">
            <DishOrDrinkRecipeDetails
              dishOrDrink={ currentDrink }
              ingredientsAndMeasures={ ingredientsAndMeasures }
            />
            <RecomendationCards page="bebidas" />
            <StartRecipeButton
              dishOrDrink={ currentDrink }
              page="bebidas"
              dishOrDrinkId={ currentDrink.idDrink }
            />
          </section>
        </section>
      </div>
    )
  );
}

export default Bebida;
