import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

describe('Testa página de login', () => {
  it('verifica se inputs estão na tela', () => {
    const { getByTestId } = renderWithRouterAndProvider(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it(`Verifica se botao começa desativado e é habilitado
   quando os inputs são preenchidos corretamente`, async () => {
    const { getByTestId,
      getByRole, getByText } = renderWithRouterAndProvider(<App />);

    const button = getByRole('button', { name: /Entrar/i });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'alguem@email');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'alguem@email.com');
    userEvent.type(passwordInput, '1234567');

    expect(button).not.toBeDisabled();

    userEvent.click(button);
    const comidasTitle = getByText('Comidas');
    expect(comidasTitle).toBeInTheDocument();
  });
});
