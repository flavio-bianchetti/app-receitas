import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsExplorer from '../components/IngredientsExplorer';
import { drinksIngredientsList } from '../services/apiDrinks';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';

function ExplorarBebidasIngredientes() {
  const [listDrinksIngredients, setListDrinksIngredients] = useState([]);
  useEffect(() => {
    dishesOrDrinksRequest(drinksIngredientsList())
      .then(({ drinks }) => setListDrinksIngredients(drinks))
      .catch(() => setListDrinksIngredients([]));
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
