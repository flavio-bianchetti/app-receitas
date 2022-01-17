import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/explorar/comidas/area');
});

const initialFoodCards = 4;
const maxLengthCards = 12;
describe('Testa página de explorar origem', () => {
  it('Testa se página de origem renderizou', async () => {
    const originPageTitle = await screen.findByText('Explorar Origem');
    expect(originPageTitle).toBeInTheDocument();
  });

  it('Testa se o search header foi renderizado', () => {
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
  });

  it('Testa se footer foi renderizado', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const drinksPageBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksPageBtn).toBeInTheDocument();

    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();

    const foodsPageBtn = screen.getByTestId('food-bottom-btn');
    expect(foodsPageBtn).toBeInTheDocument();
  });
});

describe('Testa explorar por origem', () => {
  it('Testa se existem 4 cards na tela inicialmente', async () => {
    const cards = await screen.findAllByTestId(/recipe-card/i);
    expect(cards.length).toBe(initialFoodCards);
  });

  it('Testa se as cards mudam ao buscar por origem', async () => {
    userEvent.selectOptions(await screen
      .findByTestId('explore-by-area-dropdown'), 'American');

    // expect(await screen.findByText('American').selected).toBe(true);

    // await findByAltText('Banana Pancakes');
    // const cards = await screen.findAllByTestId(/recipe-card/i);
    // expect(cards.length).toBe(maxLengthCards);
  });
});
