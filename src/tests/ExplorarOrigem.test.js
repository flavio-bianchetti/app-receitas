import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

describe('Testa página de explorar origem', () => {
  renderWithRouterAndProvider(<App />, '/area');
});
