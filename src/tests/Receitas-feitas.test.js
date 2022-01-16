import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import { indianRecipe, frenchBeefRecipe } from './mocks/recipeDoneCardMock';
import LocalStorageMock from './mocks/localStorageMock';

const categorieButtonsQuantity = 3;

global.localStorage = new LocalStorageMock();

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/receitas-feitas');
});
describe('Testa página de receitas', () => {
  it('Testa se a página receitas-feitas renderizou', () => {
    const receitasFeitasTitle = screen.getByText('Receitas Feitas');
    expect(receitasFeitasTitle).toBeInTheDocument();
  });

  it('testa se botões de categoria renderizaram', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(categorieButtonsQuantity);
  });

  it('testa se nenhuma card foi renderizada ao renderizar a página', async () => {
    const recipes = await screen.queryAllByTestId(/recipeDone-card/);
    expect(recipes.length).toBe(0);
  });
});

describe('Testa cards de receitas fetias', () => {
  it('Testa se cards de receita renderizam na tela', () => {
    localStorage.setItem('doneRecipes', [indianRecipe, frenchBeefRecipe]);

    // const promise = () => new Promise((resolve, reject) => {
    //   const local = localStorage.getItem('doneRecipes');
    //   if (local.length > 0) resolve(local);
    //   reject();
    // });

    // console.log(promise().then((a) => console.log(a)));
    const recipes = screen.queryAllByTestId(/recipeDone-card/i);
    expect(recipes.length).toBe(2);

    const indianRecipeTitle = screen.getByText(/indian/i);
    expect(indianRecipeTitle).toBeInTheDocument();
  });
});
