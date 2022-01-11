import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchFoodsBtn from '../components/SearchFoodsBtn';
import dishesRequest, { randomDish } from '../services/apiComidas';

function ExplorarComidas() {
  const buttons = [
    { title: 'Por Ingredientes', testid: 'explore-by-ingredient', page: 'ingredientes' },
    { title: 'Por Local de Origem', testid: 'explore-by-area', page: 'area' },
    { title: 'Me Surpreenda!', testid: 'explore-surprise', page: 'surprise' }];

  const history = useHistory();

  const searchFoodsBtnOnClick = ({ target }) => {
    const { name } = target;
    if (name === 'surprise') {
      dishesRequest(randomDish())
        .then(({ meals }) => history.push(`/comidas/${meals[0].idMeal}`));
    } else {
      history.push(`/explorar/comidas/${name}`);
    }
  };
  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="pages-background">
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
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
