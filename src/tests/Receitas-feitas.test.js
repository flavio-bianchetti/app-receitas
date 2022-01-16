import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

const categorieButtonsQuantity = 3;

beforeEach(() => {

});

const renderReceitasFeitas = () => (
  renderWithRouterAndProvider(<App />, '/receitas-feitas')
);
describe('Testa página de receitas', () => {
  it('Testa se a página receitas-feitas renderizou', () => {
    renderReceitasFeitas();
    const receitasFeitasTitle = screen.getByText('Receitas Feitas');
    expect(receitasFeitasTitle).toBeInTheDocument();
  });

  it('testa se botões de categoria renderizaram', () => {
    renderReceitasFeitas();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(categorieButtonsQuantity);
  });

  it('testa se nenhuma card foi renderizada ao renderizar a página', async () => {
    renderReceitasFeitas();
    const recipes = await screen.queryAllByTestId(/recipeDone-card/);
    expect(recipes.length).toBe(0);
  });
});

describe('Testa cards de receitas feitas', () => {
  it('Testa se cards de receita renderizam na tela', async () => {
    renderWithRouterAndProvider(<App />, '/comidas/52977/in-progress');

    const corbaProgress = await screen.findByTestId('recipe-title');
    expect(corbaProgress).toBeInTheDocument();

    const corbaSteps = await screen.findAllByTestId(/ingredient-step/i);

    Array.from(corbaSteps).forEach((step) => {
      userEvent.click(step);
    });

    const finalizeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finalizeBtn).not.toBeDisabled();

    userEvent.click(finalizeBtn);

    const recipeDoneTitle = screen.getByText('Receitas Feitas');
    expect(recipeDoneTitle).toBeInTheDocument();

    const corbaRecipe = await screen.findByTestId(/recipeDone-card/i);
    expect(corbaRecipe).toBeInTheDocument();
  });
});
