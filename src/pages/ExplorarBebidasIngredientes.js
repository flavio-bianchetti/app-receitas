import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsExplorer from '../components/IngredientsExplorer';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function ExplorarBebidasIngredientes() {
  const { listDrinksIngredients } = useContext(AppDeReceitasContext);
  const imageUrl = 'https://www.thecocktaildb.com/images/ingredients/';
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <IngredientsExplorer
        ingredientsList={ listDrinksIngredients }
        imageUrl={ imageUrl }
        path="/bebidas"
      />
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;
