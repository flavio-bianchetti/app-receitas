import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsExplorer from '../components/IngredientsExplorer';
import { dishesIngredientsList } from '../services/apiComidas';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';

function ExplorarComidasIngredientes() {
  const [listMealsIngredients, setListMealsIngredients] = useState([]);
  useEffect(() => {
    let isAPiSubscribed = true;
    dishesOrDrinksRequest(dishesIngredientsList())
      .then(({ meals }) => isAPiSubscribed && setListMealsIngredients(meals))
      .catch(() => isAPiSubscribed && setListMealsIngredients([]));
    return () => {
      isAPiSubscribed = false;
    };
  }, []);
  const imageUrl = 'https://www.themealdb.com/images/ingredients/';
  return (
    <div className="pages-background">
      <div className="container">
        <Header title="Explorar Ingredientes" />
        <IngredientsExplorer
          ingredientsList={ listMealsIngredients }
          imageUrl={ imageUrl }
          path="/comidas"
        />
        <Footer />
      </div>
    </div>
  );
}

export default ExplorarComidasIngredientes;
