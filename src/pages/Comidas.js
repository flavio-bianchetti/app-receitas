import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import dishesRequest, { dishesByIngredient } from '../services/apiComidas';

function Comidas() {
  const { handleSearchFoods, setDishesOrDrinks } = useContext(AppDeReceitasContext);

  useEffect(() => {
    dishesRequest(dishesByIngredient('tomato'))
      .then(({ meals }) => setDishesOrDrinks(meals));
  }, []);
  return (
    <div>
      <Header title="Comidas" handleSearch={ handleSearchFoods } />
      <Footer />
      <Cards />
    </div>
  );
}

export default Comidas;
