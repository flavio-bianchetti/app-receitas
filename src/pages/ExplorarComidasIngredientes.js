import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsExplorer from '../components/IngredientsExplorer';

function ExplorarComidasIngredientes() {
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <IngredientsExplorer
        ingredientsList={ [] }
      />
      <Footer />
    </div>
  );
}

export default ExplorarComidasIngredientes;
