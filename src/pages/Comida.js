import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RecomendationCards from '../components/RecomendationCards';
import dishesRequest, { dishesById } from '../services/apiComidas';
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
    dishesRequest(dishesById(id))
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
            <video data-testid="video" controls>
              <source src={ currentMeal.strYoutube } />
              <track src="" kind="captions" srcLang="en" label="English" />
            </video>
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
