import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/explorar/bebidas');
});

describe('Testa os Botões do Componente Explorar Bebidas', () => {
  it('Testa Botão Por Ingredientes', async () => {
    const buttonForIngredient = screen.getByTestId('explore-by-ingredient');
    expect(buttonForIngredient).toBeInTheDocument();
    expect(buttonForIngredient).toHaveTextContent('Por Ingredientes');
    expect(buttonForIngredient).not.toBeDisabled();

    fireEvent.click(buttonForIngredient);
    await screen.findByText('Light rum');
  });

  it('Testa Botão Me Surpreenda!', async () => {
    const buttonSurprise = screen.getByTestId('explore-surprise');
    expect(buttonSurprise).toBeInTheDocument();
    expect(buttonSurprise).toHaveTextContent('Me Surpreenda!');
    expect(buttonSurprise).not.toBeDisabled();

    fireEvent.click(buttonSurprise);
    await screen.findByText('Bebidas');
  });
});
