import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import App from '../App';
import RecipeDoneCard from '../components/RecipeDoneCard';
import receitasFeitasMock from './mocks/receitasFeitasMock';

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(receitasFeitasMock));
});

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/receitas-feitas');
});

describe('Testa o funcionamento do componente "RecipeDoneCard":', () => {
  RecipeDoneCard.handleShare = jest.fn();

  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  jest.spyOn(navigator.clipboard, 'writeText');

  it('testa a função "HandleShare()"', async () => {
    RecipeDoneCard.handleShare.mockImplementation(() => {
      window.navigator.clipboard.writeText('http://localhost:3000/comidas/52874');
      setIsCopied(true);
    });

    const shareBtn = await screen.findAllByTestId(/horizontal-share-btn/i);
    // console.log(shareBtn);
    userEvent.click(shareBtn[0]);
    // expect(RecipeDoneCard.handleShare).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const shareLink = screen.getByText(/link copiado!/i);
    expect(shareLink).toBeInTheDocument();
  });
});
