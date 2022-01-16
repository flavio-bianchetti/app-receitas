import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

const maxProfileButtons = 3;

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/perfil');
});

describe('Testa página de perfil', () => {
  it('Testa se renderiza header', async () => {
    const header = await screen.findByTestId('page-title');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('Perfil');
  });

  it('Testa se renderizou email do usuário', async () => {
    const email = await screen.findByTestId('profile-email');
    expect(email).toHaveTextContent('alguem@alguem.com');
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

describe('Testa botões da página de perfil', () => {
  it('Testa se existem botões da página de perfil', async () => {
    const buttons = await screen.getAllByRole('button');
    expect(buttons.length).toBe(maxProfileButtons);
  });

  it('Testa se botões de receitas feitas renderiza a página correta', async () => {
    const recipesDoneBtn = await screen
      .getByRole('button', { name: /receitas feitas/i });
    expect(recipesDoneBtn).toBeInTheDocument();
    userEvent.click(recipesDoneBtn);
    const receitasFeitasTitle = screen.getByText('Receitas Feitas');
    expect(receitasFeitasTitle).toBeInTheDocument();
  });

  it('Testa se botões de receitas favoritas renderiza a página correta', async () => {
    const favoriteRecipesBtn = await screen
      .getByRole('button', { name: /receitas favoritas/i });
    expect(favoriteRecipesBtn).toBeInTheDocument();
    userEvent.click(favoriteRecipesBtn);
    const recipesDoneTitle = screen.getByText('Receitas Favoritas');
    expect(recipesDoneTitle).toBeInTheDocument();
  });

  it('Testa se botões de receitas favoritas renderiza a página correta', async () => {
    const exitBtn = await screen
      .getByRole('button', { name: /sair/i });
    expect(exitBtn).toBeInTheDocument();
    userEvent.click(exitBtn);
    const loginTitle = screen.getByText(/receitas da vovó/i);
    expect(loginTitle).toBeInTheDocument();
  });
});
