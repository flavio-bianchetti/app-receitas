import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import ComidaEBebidaInProgress from './mocks/ComidaEBebidaInProgress';

beforeEach(() => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(ComidaEBebidaInProgress));
});

describe('Testa a correta renderização do botão "Continuar Receita" - Bebidas:',
  () => {
    beforeEach(() => {
      renderWithRouterAndProvider(<App />, '/bebidas/12732');
    });

    it('testa se o botão iniciar receita muda', async () => {
      const continueRecipeBtnBebidas = await screen.findByText(/continuar receita/i);
      expect(continueRecipeBtnBebidas).toBeInTheDocument();
    });
  });

describe('Testa a correta renderização do botão "Continuar Receita" - Comidas:',
  () => {
    beforeEach(() => {
      renderWithRouterAndProvider(<App />, '/comidas/52977');
    });

    it('testa se o botão iniciar receita muda', async () => {
      const continueRecipeBtnComidas = await screen.findByText(/continuar receita/i);
      expect(continueRecipeBtnComidas).toBeInTheDocument();
    });
  });
