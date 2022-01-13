import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/HeaderSearch';
import { dishesAreaCategories, dishesByArea } from '../services/apiComidas';
import dishesOrDrinksRequest, { searchByName } from '../services/apiSearchDrinksNFoods';
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
    dishesOrDrinksRequest(dishesAreaCategories())
      .then(({ meals }) => setAreas([{ strArea: 'All' }, ...meals]));
  }, []);

  useEffect(() => {
    if (currentArea === 'All') {
      dishesOrDrinksRequest(searchByName('themealdb', 'All'))
        .then(({ meals }) => setDishesOrDrinks(meals));
    } else {
      dishesOrDrinksRequest(dishesByArea(currentArea))
        .then(({ meals }) => setDishesOrDrinks(meals));
    }
  }, [currentArea]);

  return (
    <div>
      <div className="pages-background">
        <Header title="Explorar Origem" />
        <div className="explore-area-select-container">
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
        </div>
        <Cards />
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
