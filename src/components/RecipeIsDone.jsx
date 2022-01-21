import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function RecipeIsDone() {
  const { currentDishOrDrink } = useContext(AppDeReceitasContext);
  const history = useHistory();
  return (
    currentDishOrDrink && (
      <section className="pages-background">
        <div className="container center">
          <div className="recipeIsDone-content">
            <h1>Essa receita já foi feita</h1>
            <button
              type="button"
              onClick={ () => history.push(currentDishOrDrink.idMeal
                ? history.push('/comidas')
                : history.push('/bebidas')) }
            >
              Novas receitas

            </button>
          </div>
          <Footer />
        </div>
      </section>)
  );
}

export default RecipeIsDone;
