import React, { useContext } from 'react';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Comidas() {
  const { handleSearch } = useContext(AppDeReceitasContext);
  return (
    <div>
      <Header title="Comidas" handleSearch={ handleSearch } />
    </div>
  );
}

export default Comidas;
