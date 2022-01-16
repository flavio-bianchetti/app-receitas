import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/explorar/comidas');
});

describe('Testa o componente Explorar Comidas', () => {
  it('Testa o Botão Por Ingredientes', () => {
    const buttonByIngredient = screen.getByTestId('explore-by-ingredient');
    expect(buttonByIngredient).toBeInTheDocument();
    expect(buttonByIngredient).toHaveTextContent('Por Ingredientes');
    expect(buttonByIngredient).not.toBeDisabled();
  });

  it('Testa o Botão Por Local de Origem', () => {

  });
});
