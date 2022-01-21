import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

describe('Testa funcionamento "HeaderSearch":', () => {
  beforeEach(() => {
    renderWithRouterAndProvider(<App />, '/comidas');
  });
  it('Testa funcionamento componentes "HeaderSearch"', async () => {
    const seachIcon = await screen.findByTestId('search-top-btn');
    userEvent.click(seachIcon);
    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'chicken');
    const searchType = await screen.findByTestId('ingredient-search-radio');
    expect(searchType).toBeInTheDocument();
    userEvent.click(searchType);
    const searchButton = await screen.findByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const searchResults = await screen.findByText(/brown stew chicken/i);
    expect(searchResults).toBeInTheDocument();
  });
});
