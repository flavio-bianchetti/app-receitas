import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RecomendationCards from '../components/RecomendationCards';
import dishesRequest, { dishesById } from '../services/apiComidas';
import DishOrDrinkRecipeDetails from '../components/DishOrDrinkRecipeDetails';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import getIngredients from '../services/getIngredients';

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
  return (

  // Comando velha guarda =)

    'idMeal' in currentMeal && (
      <div>
        <DishOrDrinkRecipeDetails
          dishOrDrink={ currentMeal }
          ingredients={ ingredients }
        />
        <video data-testid="video" controls>
          <source src={ currentMeal.strYoutube } />
          <track src="" kind="captions" srcLang="en" label="English" />
        </video>
        <RecomendationCards page="comidas" id={ currentMeal.idMeal } />
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Começar receita
        </button>
      </div>
    )

  );
}

export default Comida;
