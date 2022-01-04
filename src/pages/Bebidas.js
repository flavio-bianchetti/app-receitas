import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import drinksRequest, { drinksByIngredient } from '../services/apiDrinks';

function Bebidas() {
  const { handleSearchDrinks, setDishesOrDrinks } = useContext(AppDeReceitasContext);

  useEffect(() => {
    drinksRequest(drinksByIngredient('tequila'))
      .then(({ drinks }) => setDishesOrDrinks(drinks));
  }, []);
  return (
    <div>
      <Header title="Bebidas" handleSearch={ handleSearchDrinks } />
      <Footer />
      <Cards />
    </div>
  );
}

export default Bebidas;
