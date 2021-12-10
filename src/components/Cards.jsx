import React, { useContext } from 'react';
import AppDeReceitasContext from '../context/AppDeReceitasContext';
import Card from './Card';

function Cards() {
  const { dishesOrDrinks } = useContext(AppDeReceitasContext);
  const maxCards = 11;

  return (
    <div className="foodAndDrinks-cards-container">
      {dishesOrDrinks.filter((_, index) => {
        if (index > maxCards) {
          return false;
        }
        return true;
      }).map((item, i) => (
        <Card
          key={ item.idDrink || item.idMeal }
          index={ i }
          nameItem={ item.strDrink || item.strMeal }
          image={ item.strDrinkThumb || item.strMealThumb }
        />
      ))}
    </div>
  );
}

export default Cards;
