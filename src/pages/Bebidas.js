import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Bebidas() {
  const { handleSearchDrinks } = useContext(AppDeReceitasContext);
  return (
    <div>
      <Header title="Bebidas" handleSearch={ handleSearchDrinks } />
      <Cards />
    </div>
  );
}

export default Bebidas;
