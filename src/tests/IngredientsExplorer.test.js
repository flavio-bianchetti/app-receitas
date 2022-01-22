import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import App from '../App';
import ExplorarComidasIngredientes from '../pages/ExplorarComidasIngredientes';

const maxLengthIngredientsList = 12;

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/explorar/comidas/ingredientes');
});

describe('Verifica se o header da página foi corretamente renderizado',
  () => {
    it('testa se os elementos do cabeçalho estão corretos.', async () => {
      const title = await screen.findByTestId('page-title');
      expect(title).toBeInTheDocument();
      const profileIcon = await screen.findByTestId('profile-top-btn');
      expect(profileIcon).toBeInTheDocument();
    });
  });

// describe('Testa o funcionamento das funções do arquivo "ExplorarComidasIngredientes":',
//   () => {
//     ExplorarComidasIngredientes.handleClickLink = jest.fn();

//     it('testa a função "HandleClickLink()"', async () => {
//       ExplorarComidasIngredientes.handleClickLink.mockImplementation((ingredient) => {
//         console.log(ingredient);
//         handleSearchDrinksNFoods(
//           'search-ingredient',
//           'Chicken',
//           'themealdb',
//         );
//         setIsClickedIngredientImage(true);
//       });

//       const cards = await screen.findAllByTestId(/card-img/i);
//       expect(cards.length).toBe(maxLengthIngredientsList);
//       userEvent.click(cards[0]);
//       const dishes = await screen.findAllByTestId(/card-name/);
//       expect(dishes.length).toBe(maxLengthIngredientsList);
//       expect(dishes[0].textContent).toBe('Chicken');
//     });
//   });
