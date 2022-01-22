import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { dishesAreaCategories, dishesByArea } from '../services/apiComidas';
import dishesOrDrinksRequest, { searchByName } from '../services/apiSearchDrinksNFoods';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import Cards from '../components/Cards';
import HeaderSearch from '../components/HeaderSearch';

function ExplorarOrigem() {
  const [areas, setAreas] = useState([]);
  const [currentArea, setCurrentArea] = useState('All');

  const { setDishesOrDrinks,
    handleSearchDrinksNFoods } = useContext(AppDeReceitasContext);

  const onChangeArea = ({ target }) => {
    const { value } = target;
    setCurrentArea(value);
  };
  useEffect(() => {
    let isAPiSubscribed = true;
    dishesOrDrinksRequest(dishesAreaCategories())
      .then(({ meals }) => isAPiSubscribed && setAreas([{ strArea: 'All' }, ...meals]));

    return () => {
      isAPiSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isAPiSubscribed = true;
    if (currentArea === 'All') {
      dishesOrDrinksRequest(searchByName('themealdb', 'All'))
        .then(({ meals }) => isAPiSubscribed && setDishesOrDrinks(meals));
    } else {
      dishesOrDrinksRequest(dishesByArea(currentArea))
        .then(({ meals }) => isAPiSubscribed && setDishesOrDrinks(meals));
    }

    return () => {
      isAPiSubscribed = false;
    };
  }, [currentArea]);

  return (
    <div className="pages-background">
      <div className="container">
        <HeaderSearch
          title="Explorar Origem"
          handleSearch={ handleSearchDrinksNFoods }
          url="themealdb"
        />
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
        <Footer />
      </div>
    </div>
  );
}

export default ExplorarOrigem;
