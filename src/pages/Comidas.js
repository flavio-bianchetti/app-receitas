import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import dishesRequest, { dishesByName } from '../services/apiComidas';
import { getDishCategories } from '../services/categories';
import FoodCategorieBtn from '../components/FoodCategorieBtn';

const categorieBtnQuantity = 4;

function Comidas() {
  const { handleSearchFoods, setDishesOrDrinks,
    setCategorieRequest } = useContext(AppDeReceitasContext);

  const [dishCategories, setDishCategories] = useState([]);

  useEffect(() => {
    dishesRequest(dishesByName(''))
      .then(({ meals }) => setDishesOrDrinks(meals));

    getDishCategories()
      .then(({ meals }) => setDishCategories(meals));
  }, []);

  const onCategorieButtonClick = async (dish) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${dish}`);
    const { meals } = await response.json();
    setCategorieRequest(true);
    setDishesOrDrinks(meals);
  };
  return (
    <div>
      <Header title="Comidas" handleSearch={ handleSearchFoods } />
      <section>
        {dishCategories.map(({ strCategory }, i) => {
          if (i > categorieBtnQuantity) return false;
          return (<FoodCategorieBtn
            key={ strCategory }
            categoryName={ strCategory }
            onCategorieButtonClick={ onCategorieButtonClick }
          />);
        })}
      </section>
      <Cards />
      <Footer />
    </div>
  );
}

export default Comidas;
