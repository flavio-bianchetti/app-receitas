import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import { allFoodCardsTitles, dessertFoodsCardsTitles } from './mocks/allCardsMock';

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
    expect(foodCards.length).toBe(foodCardsMaxLength);
  });

  // Fazer um forEach de receitas quando clicar no botão, criando um mock
});

describe('Testa se no máximo 12 cards de comidas são renderizadas', () => {
  it(`Testa se ao clicar no botão de uma 
  categoria renderiza outras 12 cards`, async () => {
    const dessertFoodsBtn = await screen.findByTestId('Dessert-category-filter');
    expect(dessertFoodsBtn).toBeInTheDocument();

    const allInitialFoodCards = await screen.findAllByTestId(/card-name/i);
    expect(allInitialFoodCards.length).toBe(foodCardsMaxLength);

    allInitialFoodCards.forEach((foodCard, i) => {
      expect(foodCard).toHaveTextContent(allFoodCardsTitles[i]);
    });

    userEvent.click(dessertFoodsBtn);

    await screen.findByText('Apam balik');

    const dessertFoodCards = await screen.findAllByTestId(/card-name/i);

    dessertFoodCards.forEach((foodCard, i) => {
      expect(foodCard).toHaveTextContent(dessertFoodsCardsTitles[i]);
    });

    const allBtn = await screen.findByTestId('All-category-filter');
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);

    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
  });

  it('Testa se ao clicar em outras categorias as cards são renderizadas', async () => {
    const beefBtn = await screen.findByTestId('Beef-category-filter');
    expect(beefBtn).toBeInTheDocument();

    userEvent.click(beefBtn);

    const beefPie = await screen.findByText(/beef and mustard/i);
    expect(beefPie).toBeInTheDocument();

    const recipeCards = await screen.findAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(foodCardsMaxLength);

    userEvent.click(beefBtn);

    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
  });
});

describe('Testa receitas em comidas', () => {
  it('testa se ao clicar em uma imagem a página de comida renderiza', async () => {
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();

    userEvent.click(corba);

    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });
});
