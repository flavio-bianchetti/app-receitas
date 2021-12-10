import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Comidas() {
  const { handleSearch } = useContext(AppDeReceitasContext);
  return (
    <div>
      <Header title="Comidas" handleSearch={ handleSearch } />
      <Footer />
    </div>
  );
}

export default Comidas;
