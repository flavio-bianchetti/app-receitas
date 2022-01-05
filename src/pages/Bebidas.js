import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import drinksRequest, { drinksByName } from '../services/apiDrinks';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getDrinksCategories } from '../services/categories';
import FoodCategorieBtn from '../components/FoodCategorieBtn';

const categorieBtnQuantity = 4;
function Bebidas() {
  const { handleSearchDrinks, setDishesOrDrinks,
    setCategorieRequest } = useContext(AppDeReceitasContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [categorieButtonCick, setCategorieButtonCick] = useState('');

  const getDrinks = () => {
    drinksRequest(drinksByName(''))
      .then(({ drinks }) => setDishesOrDrinks(drinks));
  };

  useEffect(() => {
    getDrinks();

    getDrinksCategories()
      .then(({ drinks }) => setDrinkCategories(drinks));
  }, []);

  const onCategorieButtonClick = async (drink) => {
    if (drink === 'All') {
      setCategorieButtonCick('All');
      return getDrinks();
    }
    if (categorieButtonCick !== drink) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`);
      const { drinks } = await response.json();
      console.log(drinks);
      setCategorieRequest(true);
      setDishesOrDrinks(drinks);
      setCategorieButtonCick(drink);
    } else {
      getDrinks();
      setCategorieButtonCick('');
    }
  };

  return (
    <div>
      <Header title="Bebidas" handleSearch={ handleSearchDrinks } />
      <section>
        <button
          type="button"
          value="All"
          onClick={ (e) => onCategorieButtonClick(e.target.value) }
          data-testid="All-category-filter"
        >
          All

        </button>
        {drinkCategories.map(({ strCategory }, i) => {
          if (i > categorieBtnQuantity) return false;
          return (<FoodCategorieBtn
            onCategorieButtonClick={ onCategorieButtonClick }
            key={ strCategory }
            categoryName={ strCategory }
          />);
        })}
      </section>
      <Cards />
      <Footer />
    </div>
  );
}

export default Bebidas;
