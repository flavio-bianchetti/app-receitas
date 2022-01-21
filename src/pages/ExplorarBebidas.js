import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchFoodsBtn from '../components/SearchFoodsBtn';
import { randomDrink } from '../services/apiDrinks';
import dishesOrDrinksRequest from '../services/apiSearchDrinksNFoods';

function ExplorarBebidas() {
  const buttons = [
    { title: 'Por Ingredientes', testid: 'explore-by-ingredient', page: 'ingredientes' },
    { title: 'Me Surpreenda!', testid: 'explore-surprise', page: 'surprise' }];

  const history = useHistory();

  const searchFoodsBtnOnClick = ({ target }) => {
    const { name } = target;

    if (name === 'surprise') {
      dishesOrDrinksRequest(randomDrink())
        .then(({ drinks }) => history.push(`/bebidas/${drinks[0].idDrink}`));
    } else {
      history.push(`/explorar/bebidas/${name}`);
    }
  };

  return (
    <div className="pages-background">
      <div className="container">
        <Header title="Explorar Bebidas" />
        <div className="profile-content">
          {buttons.map(({ title, testid, page }) => (
            <SearchFoodsBtn
              key={ title }
              title={ title }
              testid={ testid }
              page={ page }
              searchFoodsBtnOnClick={ searchFoodsBtnOnClick }
            />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ExplorarBebidas;
