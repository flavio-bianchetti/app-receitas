import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Comidas({ history }) {
  const { handleSearchFoods } = useContext(AppDeReceitasContext);
  return (
    <div>
      <Header title="Comidas" history={ history } handleSearch={ handleSearchFoods } />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comidas;
