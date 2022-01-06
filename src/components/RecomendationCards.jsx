import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecomendationCard from './RecomendationCard';
import dishesRequest, { dishesByName } from '../services/apiComidas';
import drinksRequest, { drinksByName } from '../services/apiDrinks';

function RecomendationCards({ id, page }) {
  const [suggestedDishes, setSuggestedDishes] = useState([]);
  const maxDishes = 6;

  useEffect(() => {
    if (page === 'comidas' && suggestedDishes.length < maxDishes) {
      drinksRequest(drinksByName(''))
        .then(({ drinks }) => setSuggestedDishes(drinks
          .slice(0, maxDishes)));
    }
    if (page === 'bebidas' && suggestedDishes.length < maxDishes) {
      dishesRequest(dishesByName(''))
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
          />
        ))}
    </div>
  );
}

RecomendationCards.propTypes = {
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default RecomendationCards;
