import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecomendationCard from './RecomendationCard';
import dishesOrDrinksRequest, { searchByName } from '../services/apiSearchDrinksNFoods';

function RecomendationCards({ page }) {
  const [suggestedDishes, setSuggestedDishes] = useState([]);
  const maxDishes = 6;

  useEffect(() => {
    if (page === 'comidas' && suggestedDishes.length < maxDishes) {
      dishesOrDrinksRequest(searchByName('thecocktaildb', ''))
        .then(({ drinks }) => setSuggestedDishes(drinks
          .slice(0, maxDishes)));
    }
    if (page === 'bebidas' && suggestedDishes.length < maxDishes) {
      dishesOrDrinksRequest(searchByName('themealdb', ''))
        .then(({ meals }) => setSuggestedDishes(meals
          .slice(0, maxDishes)));
    }
  }, [suggestedDishes]);

  return (
    <div className="rec-cards-container">
      {suggestedDishes
        .map((item, i) => (
          <RecomendationCard
            key={ item.idDrink || item.idMeal }
            index={ i }
            nameItem={ item.strDrink || item.strMeal }
            image={ item.strDrinkThumb || item.strMealThumb }
            id={ item.idDrink || item.idMeal }
            page={ page === 'comidas' ? 'bebidas' : 'comidas' }
          />
        ))}
    </div>
  );
}

RecomendationCards.propTypes = {
  page: PropTypes.string.isRequired,
};

export default RecomendationCards;
