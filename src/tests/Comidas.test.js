import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/comidas');
});

const categoryButtonsMaxLength = 6;
const foodCardsMaxLength = 12;

describe('Testa página de comidas', () => {
  it('Testa se renderizou pagina de comidas', () => {
    const comidas = screen.getByText('Comidas');
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
  });

  it('Testa se renderizou todos os botões de categoria', async () => {
    const buttons = await screen.findAllByTestId(/category-filter/i);
    expect(buttons.length).toBe(categoryButtonsMaxLength);
  });

  it('Testa se foi renderizado 12 cards de receita', async () => {
    const foodCards = await screen.findAllByTestId(/recipe-card/i);
    expect(foodCards.length).toBe(foodCardsMaxLength);
  });

  // Fazer um forEach de receitas quando clicar no botão, criando um mock
  it(`Testa se ao clicar no botão de uma 
  categoria renderiza outras 12 cards`, async () => {
    const beefCategoryBtn = await screen.findByTestId('Beef-category-filter');
    expect(beefCategoryBtn).toBeInTheDocument();

    const firstFood = await screen.findByTestId('0-recipe-card');
    expect(firstFood).toBeInTheDocument();

    const firstFoodTitle = await screen.findByTestId('0-card-name');
    expect(firstFoodTitle).toHaveTextContent('Corba');
    userEvent.click(beefCategoryBtn);

    const firstFoodTitleAfterButtonClick = await screen
      .findByText('Beef and Mustard Pie');
    expect(firstFoodTitleAfterButtonClick).toHaveTextContent('Beef and Mustard Pie');
  });
});