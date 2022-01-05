import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import drinksRequest, { drinksByName } from '../services/apiDrinks';
import { getDrinksCategories } from '../services/categories';
import FoodCategorieBtn from '../components/FoodCategorieBtn';

const categorieBtnQuantity = 4;
function Bebidas() {
  const { handleSearchDrinks, setDishesOrDrinks,
    setCategorieRequest } = useContext(AppDeReceitasContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  useEffect(() => {
    drinksRequest(drinksByName(''))
      .then(({ drinks }) => setDishesOrDrinks(drinks));

    getDrinksCategories()
      .then(({ drinks }) => setDrinkCategories(drinks));
  }, []);

  const onCategorieButtonClick = async (drink) => {
    console.log(drink);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`);
    const { drinks } = await response.json();
    console.log(drinks);
    setCategorieRequest(true);
    setDishesOrDrinks(drinks);
  };

  return (
    <div>
      <Header title="Bebidas" handleSearch={ handleSearchDrinks } />
      <section>
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
