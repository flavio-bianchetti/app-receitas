import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RecomendationCards from '../components/RecomendationCards';
import dishesRequest, { dishesById } from '../services/apiComidas';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getIngredients, getMeasures } from '../services/ingredientsAndMeasures';
import StartRecipeButton from '../components/StartRecipeButton';

function Comida() {
  const {
    currentDishOrDrink: currentMeal,
    setCurrentDishOrDrink: setCurrentMeal } = useContext(AppDeReceitasContext);
  console.log(currentMeal);

  const { id } = useParams();

  // const history = useHistory();
  // const path = history.location.pathname;
  // const page = path.split('/')[1];
  // console.log(page);
  // const id = path.match(/(\d+)/)[0];

  useEffect(() => {
    dishesRequest(dishesById(id))
      .then(({ meals }) => setCurrentMeal(meals.find((meal) => meal.idMeal === id)));
  }, []);

  const ingredients = getIngredients(currentMeal);

  const measures = getMeasures(currentMeal);

  const ingredientsAndMeasures = ingredients.map((ingredient, index) => (
    {
      [ingredient]: measures[index],
    }
  ));

  return (

  // Comando velha guarda =)

    'idMeal' in currentMeal && (
      <div>
        <DishOrDrinkRecipeDetails
          dishOrDrink={ currentMeal }
          ingredientsAndMeasures={ ingredientsAndMeasures }
        />
        <video data-testid="video" controls>
          <source src={ currentMeal.strYoutube } />
          <track src="" kind="captions" srcLang="en" label="English" />
        </video>
        <RecomendationCards page="comidas" id={ currentMeal.idMeal } />
        <StartRecipeButton dishOrDrink={ currentMeal } meal="comida" />
      </div>
    )

  );
}

export default Comida;
