import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Comidas() {
  const { handleSearchFoods } = useContext(AppDeReceitasContext);
  return (
    <div>
      <Header title="Comidas" handleSearch={ handleSearchFoods } />
      <Footer />
      <Cards />
    </div>
  );
}

export default Comidas;
