import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/bebidas/15997/in-progress');
});

describe('Testa pagina de bebida in progress', () => {
  it('Testa se o header está na página', async () => {
    const header = await screen.findByTestId('page-title');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('Bebidas');
  });
});
