import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RecomendationCards from '../components/RecomendationCards';
import { dishesById } from '../services/apiComidas';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import StartRecipeButton from '../components/StartRecipeButton';
import HeaderHeader from '../components/HeaderHeader';

function Comida() {
  const {
    currentDishOrDrink: currentMeal,
    setCurrentDishOrDrink: setCurrentMeal,
    ingredientsAndMeasures } = useContext(AppDeReceitasContext);
  console.log(currentMeal.strYoutube);

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    dishesOrDrinksRequest(dishesById(id))
      .then(({ meals }) => setCurrentMeal(meals
        .find((meal) => meal.idMeal === id)));
  }, [id]);

  return (

  // Comando velha guarda =)

    Object.keys(currentMeal).length > 0 && (
      <div className="pages-background-drink-food">
        <HeaderHeader title="Comidas" />
        <section className="food-details-container">
          <section className="food-details">
            <DishOrDrinkRecipeDetails
              dishOrDrink={ currentMeal }
              ingredientsAndMeasures={ ingredientsAndMeasures }
            />
            <iframe
              data-testid="video"
              src={ currentMeal.strYoutube.replace('watch?v=', 'embed/') }
              title={ currentMeal.strMeal }
            />

            <RecomendationCards page="comidas" />
            <StartRecipeButton
              dishOrDrink={ currentMeal }
              page="comidas"
              dishOrDrinkId={ currentMeal.idMeal }
            />
          </section>
        </section>
      </div>
    )

  );
}

export default Comida;
