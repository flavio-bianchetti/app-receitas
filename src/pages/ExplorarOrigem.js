import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/HeaderSearch';
import dishesRequest,
{ dishesAreaCategories, dishesByArea, dishesByName } from '../services/apiComidas';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import Cards from '../components/Cards';

function ExplorarOrigem() {
  const [areas, setAreas] = useState([]);
  const [currentArea, setCurrentArea] = useState('All');

  const { setDishesOrDrinks } = useContext(AppDeReceitasContext);

  const onChangeArea = ({ target }) => {
    const { value } = target;
    setCurrentArea(value);
  };
  useEffect(() => {
    dishesRequest(dishesAreaCategories())
      .then(({ meals }) => setAreas([{ strArea: 'All' }, ...meals]));
  }, []);

  useEffect(() => {
    if (currentArea === 'All') {
      dishesRequest(dishesByName('All'))
        .then(({ meals }) => setDishesOrDrinks(meals));
    } else {
      dishesRequest(dishesByArea(currentArea))
        .then(({ meals }) => setDishesOrDrinks(meals));
    }
  }, [currentArea]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => onChangeArea(e) }
      >
        {areas.map(({ strArea }) => (
          <option
            key={ strArea }
            value={ strArea }
            data-testid={ `${strArea}-option` }
          >
            {strArea}

          </option>
        ))}
      </select>
      <Cards />
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
