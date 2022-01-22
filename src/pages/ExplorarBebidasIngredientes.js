import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsExplorer from '../components/IngredientsExplorer';
import { drinksIngredientsList } from '../services/apiDrinks';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';

function ExplorarBebidasIngredientes() {
  const [listDrinksIngredients, setListDrinksIngredients] = useState([]);
  useEffect(() => {
    let isAPiSubscribed = true;
    dishesOrDrinksRequest(drinksIngredientsList())
      .then(({ drinks }) => isAPiSubscribed && setListDrinksIngredients(drinks))
      .catch(() => isAPiSubscribed && setListDrinksIngredients([]));
    return () => {
      isAPiSubscribed = false;
    };
  }, []);

  const imageUrl = 'https://www.thecocktaildb.com/images/ingredients/';
  return (
    <div className="pages-background">
      <div className="container">
        <Header title="Explorar Ingredientes" />
        <IngredientsExplorer
          ingredientsList={ listDrinksIngredients }
          imageUrl={ imageUrl }
          path="/bebidas"
        />
        <Footer />
      </div>
    </div>
  );
}

export default ExplorarBebidasIngredientes;
