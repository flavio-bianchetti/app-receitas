import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import HeaderSearch from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getDishCategories } from '../services/categories';
import FoodCategorieBtn from '../components/FoodCategorieBtn';
import dishesRequest, { dishesByName } from '../services/apiComidas';

const categorieBtnQuantity = 5;

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
      .then(({ meals }) => setDishCategories([{ strCategory: 'All' }, ...meals]));
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
    handleSearchFoods && (
      <div className="pages-background">
        <HeaderSearch title="Comidas" handleSearch={ handleSearchFoods } />
        <section className="foodsAndDrinks-container">
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
        </section>
        <Footer />
      </div>
    )
  );
}

export default Comidas;
