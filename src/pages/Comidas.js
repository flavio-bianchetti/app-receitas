import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Header from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getDishCategories } from '../services/categories';
import FoodCategorieBtn from '../components/FoodCategorieBtn';
import dishesRequest, { dishesByName } from '../services/apiComidas';

const categorieBtnQuantity = 4;

function Comidas() {
  const { handleSearchFoods, setDishesOrDrinks,
    setCategorieRequest } = useContext(AppDeReceitasContext);

  const [dishCategories, setDishCategories] = useState([]);
  const [categorieButtonCick, setCategorieButtonCick] = useState('');

  const getDishes = () => {
    dishesRequest(dishesByName(''))
      .then(({ meals }) => setDishesOrDrinks(meals));
  };

  useEffect(() => {
    getDishes();

    getDishCategories()
      .then(({ meals }) => setDishCategories(meals));
  }, []);

  const onCategorieButtonClick = async (dish) => {
    if (dish === 'All') {
      setCategorieButtonCick('All');
      return getDishes();
    }
    if (categorieButtonCick !== dish) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${dish}`);
      const { meals } = await response.json();
      setCategorieRequest(true);
      setDishesOrDrinks(meals);
      setCategorieButtonCick(dish);
    } else {
      getDishes();
      setCategorieButtonCick('');
    }
  };
  return (
    <div>
      <Header title="Comidas" handleSearch={ handleSearchFoods } />
      <section>
        <button
          type="button"
          value="All"
          onClick={ (e) => onCategorieButtonClick(e.target.value) }
          data-testid="All-category-filter"
        >
          All

        </button>
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
