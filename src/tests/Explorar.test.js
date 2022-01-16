import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/explorar');
});

describe('Verifica os Botões do componente Explorar', () => {
  it('Verifica Botão de Explorar Comidas', async () => {
    const buttonFoods = screen.getByTestId('explore-food');
    expect(buttonFoods).toBeInTheDocument();
    expect(buttonFoods).toHaveTextContent('Explorar Comidas');
    expect(buttonFoods).not.toBeDisabled();

    fireEvent.click(buttonFoods);
    await screen.findByText('Explorar Comidas');
  });

  it('Verifica se tem o Botão Explorar Bebidas', async () => {
    const buttonDrinks = screen.getByTestId('explore-drinks');
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonDrinks).toHaveTextContent('Explorar Bebidas');
    expect(buttonDrinks).not.toBeDisabled();

    fireEvent.click(buttonDrinks);
    await screen.findByText('Explorar Bebidas');
  });
});
