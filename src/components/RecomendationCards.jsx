import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecomendationCard from './RecomendationCard';
import dishesRequest, { randomDish } from '../services/apiComidas';
import drinksRequest, { randomDrink } from '../services/apiDrinks';

function RecomendationCards({ id, page }) {
  const [suggestedDishes, setSuggestedDishes] = useState([]);
  const maxDishes = 3;

  useEffect(() => {
    if (page === 'comidas' && suggestedDishes.length < maxDishes) {
      dishesRequest(randomDish())
        .then(({ meals }) => setSuggestedDishes([...suggestedDishes, meals[0]]));
    }
    if (page === 'bebidas' && suggestedDishes.length < maxDishes) {
      drinksRequest(randomDrink())
        .then(({ drinks }) => setSuggestedDishes([...suggestedDishes, drinks[0]]));
    }
  }, [suggestedDishes]);

  return (
    <div className="recomendation-cards-container">
      {suggestedDishes
        .filter((item) => item.idMeal !== id || item.idDrink !== id)
        .slice(0, 2)
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
