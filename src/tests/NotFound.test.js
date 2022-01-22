import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

it('Testa se notFound page renderizou', () => {
  renderWithRouterAndProvider(<App />, '/notFound');
  const notFoundText = screen.getByText(/receita queimou/i);
  expect(notFoundText).toBeInTheDocument();
});
