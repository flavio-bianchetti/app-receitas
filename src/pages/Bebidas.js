import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Bebidas() {
  const { handleSearchDrinks } = useContext(AppDeReceitasContext);
  return (
    <div>
      <Header title="Bebidas" handleSearch={ handleSearchDrinks } />
      <Footer />
    </div>
  );
}

export default Bebidas;
