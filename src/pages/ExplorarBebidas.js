import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchFoodsBtn from '../components/SearchFoodsBtn';
import drinksRequest, { randomDrink } from '../services/apiDrinks';

function ExplorarBebidas() {
  const buttons = [
    { title: 'Por Ingredientes', testid: 'explore-by-ingredient', page: 'ingredientes' },
    { title: 'Me Surpreenda!', testid: 'explore-surprise', page: 'surprise' }];

  const history = useHistory();

  const searchFoodsBtnOnClick = ({ target }) => {
    const { name } = target;

    if (name === 'surprise') {
      drinksRequest(randomDrink())
        .then(({ drinks }) => history.push(`/bebidas/${drinks[0].idDrink}`));
    } else {
      history.push(`/explorar/bebidas/${name}`);
    }
  };

  return (
    <div>
      <Header title="Explorar Bebidas" />
      {buttons.map(({ title, testid, page }) => (
        <SearchFoodsBtn
          key={ title }
          title={ title }
          testid={ testid }
          page={ page }
          searchFoodsBtnOnClick={ searchFoodsBtnOnClick }
        />
      ))}
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
