import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/explorar');
});

describe('Verifica os Botões do componente Explorar', () => {
  it('Verifica se tem o Botão de Explorar Comidas', () => {
    const buttonFoods = screen.getByTestId('explore-food');
    expect(buttonFoods).not.toBeDisabled();
  });

  it('Verifica se tem o Botão Explorar Bebidas', () => {
    const buttonDrinks = screen.getByTestId('explore-drinks');
    expect(buttonDrinks).not.toBeDisabled();
  });
});
