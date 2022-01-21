import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import HeaderSearch from '../components/HeaderSearch';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getDishCategories } from '../services/categories';
import FoodCategorieBtn from '../components/FoodCategorieBtn';
import dishesOrDrinksRequest, { searchByName } from '../services/apiSearchDrinksNFoods';

const categorieBtnQuantity = 5;

function Comidas() {
  const { handleSearchDrinksNFoods, setDishesOrDrinks,
    setCategorieRequest, isClickedIngredientImage,
    setIsClickedIngredientImage } = useContext(AppDeReceitasContext);

  const [dishCategories, setDishCategories] = useState([]);
  const [categorieButtonCick, setCategorieButtonCick] = useState('');

  const getDishes = () => {
    dishesOrDrinksRequest(searchByName('themealdb', ''))
      .then(({ meals }) => setDishesOrDrinks(meals));
  };

  useEffect(() => {
    if (!isClickedIngredientImage) {
      getDishes();

      getDishCategories()
        .then(({ meals }) => setDishCategories([{ strCategory: 'All' }, ...meals]));
    } else {
      setIsClickedIngredientImage(false);
    }
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
    handleSearchDrinksNFoods && (
      <div className="pages-background">
        <div className="container">
          <HeaderSearch
            title="Comidas"
            handleSearch={ handleSearchDrinksNFoods }
            url="themealdb"
          />
          <section className="foodsAndDrinks-category-container">
            {dishCategories.map(({ strCategory }, i) => {
              if (i > categorieBtnQuantity) return false;
              return (<FoodCategorieBtn
                key={ strCategory }
                categoryName={ strCategory }
                onCategorieButtonClick={ onCategorieButtonClick }
              />);
            })}
          </section>
          <section className="foodsAndDrinks-container">
            <Cards />
          </section>
          <Footer />
        </div>
      </div>
    )
  );
}

export default Comidas;
