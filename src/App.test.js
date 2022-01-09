import React from 'react';
import App from './App';
import renderWithRouter from './renderWithRouterAndProvider'


test('Farewell, front-end', () => {
  const { getByText } = renderWithRouter(<App />);
  const login = getByText(/login/i)
  expect(login).toBeInTheDocument()
});
