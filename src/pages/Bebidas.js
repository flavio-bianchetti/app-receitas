import React, { useContext } from 'react';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Bebidas() {
  const { handleSearchDrinks } = useContext(AppDeReceitasContext);
  return (
    <div>
      <Header title="Bebidas" handleSearch={ handleSearchDrinks } />
    </div>
  );
}

export default Bebidas;
