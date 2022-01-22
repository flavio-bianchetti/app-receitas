import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import HeaderSearch from '../components/HeaderSearch';
import drinksRequest, { searchByName } from '../services/apiSearchDrinksNFoods';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import { getDrinksCategories } from '../services/categories';
import FoodCategorieBtn from '../components/FoodCategorieBtn';

const categorieBtnQuantity = 5;
function Bebidas() {
  const { handleSearchDrinksNFoods, setDishesOrDrinks,
    setCategorieRequest } = useContext(AppDeReceitasContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [categorieButtonCick, setCategorieButtonCick] = useState('');

  const getDrinks = () => {
    drinksRequest(searchByName('thecocktaildb', ''))
      .then(({ drinks }) => setDishesOrDrinks(drinks));
  };

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getDrinks();

      getDrinksCategories()
        .then(({ drinks }) => setDrinkCategories([{ strCategory: 'All' }, ...drinks]));
    }

    return () => {
      isApiSubscribed = false;
    };
  }, []);

  const onCategorieButtonClick = async (drink) => {
    if (drink === 'All') {
      setCategorieButtonCick('All');
      return getDrinks();
    }
    if (categorieButtonCick !== drink) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`);
      const { drinks } = await response.json();
      setCategorieRequest(true);
      setDishesOrDrinks(drinks);
      setCategorieButtonCick(drink);
    } else {
      getDrinks();
      setCategorieButtonCick('');
    }
  };

  return (
    handleSearchDrinksNFoods && (
      <div className="pages-background">
        <div className="container">
          <HeaderSearch
            title="Bebidas"
            handleSearch={ handleSearchDrinksNFoods }
            url="thecocktaildb"
          />
          <section className="foodsAndDrinks-category-container">
            {drinkCategories.map(({ strCategory }, i) => {
              if (i > categorieBtnQuantity) return false;
              return (<FoodCategorieBtn
                onCategorieButtonClick={ onCategorieButtonClick }
                key={ strCategory }
                categoryName={ strCategory }
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

export default Bebidas;
