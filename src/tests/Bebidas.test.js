import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import { allDrinksCardsTitles, ordinaryDrinksCardsTitles } from './mocks/allCardsMock';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/bebidas');
});

const categoryButtonsMaxLength = 6;
const drinksMaxLength = 12;

describe('Testa página de comidas', () => {
  it('Testa se renderizou pagina de comidas', () => {
    const comidas = screen.getByText('Bebidas');
    expect(comidas).toBeInTheDocument();
  });

  it('Testa se botao de perfil é renderizado', () => {
    const button = screen.getByTestId('profile-top-btn');

    expect(button).toBeInTheDocument();
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

  it('Testa se renderizou todos os botões de categoria', async () => {
    const buttons = await screen.findAllByTestId(/category-filter/i);
    expect(buttons.length).toBe(categoryButtonsMaxLength);
  });

  it('Testa se foi renderizado 12 cards de receita', async () => {
    const foodCards = await screen.findAllByTestId(/recipe-card/i);
    expect(foodCards.length).toBe(drinksMaxLength);
  });

  // Fazer um forEach de receitas quando clicar no botão, criando um mock
});

describe('Testa se as 12 cards de bebidas são renderizadas', () => {
  it(`Testa se ao clicar no botão de uma 
  categoria renderiza outras 12 cards`, async () => {
    const ordinaryDrinksBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(ordinaryDrinksBtn).toBeInTheDocument();

    const allInitialFoodCards = await screen.findAllByTestId(/card-name/i);
    expect(allInitialFoodCards.length).toBe(drinksMaxLength);

    allInitialFoodCards.forEach((foodCard, i) => {
      expect(foodCard).toHaveTextContent(allDrinksCardsTitles[i]);
    });
    userEvent.click(ordinaryDrinksBtn);

    await screen.findByText('3-Mile Long Island Iced Tea');

    const ordinaryDrinksCards = await screen.findAllByTestId(/card-name/i);

    ordinaryDrinksCards.forEach((foodCard, i) => {
      expect(foodCard).toHaveTextContent(ordinaryDrinksCardsTitles[i]);
    });
  });
});
