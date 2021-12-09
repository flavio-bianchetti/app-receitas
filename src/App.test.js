import userEvent from '@testing-library/user-event';
import React from 'react';
import App from './App';
import renderWithRouter from './renderWithRouter'


test('Farewell, front-end', () => {
  const { getByText } = renderWithRouter(<App />);
  const login = getByText(/login/i)
  expect(login).toBeInTheDocument()
});

describe('Testa página de login', () => {

  it('verifica se inputs estão na tela', () => {
    const {getByLabelText} = renderWithRouter(<App />)
    const emailInput = getByLabelText(/Email/i)
    const passwordInput = getByLabelText(/Senha/i)

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    
  })

  it(`Verifica se botao começa desativado e é habilitado
   quando os inputs são preenchidos corretamente`, () => {
    const {getByLabelText, getByRole } = renderWithRouter(<App />)  

    const button = getByRole('button', {name: /Entrar/i})
    const emailInput = getByLabelText(/Email/i)
    const passwordInput = getByLabelText(/Senha/i)

    expect(button).toBeDisabled()

    userEvent.type(emailInput, 'alguem@email.com')
    userEvent.type(passwordInput, '1234567')

    expect(button).not.toBeDisabled()

    userEvent.type(emailInput, 'alguem@email')
    expect(button).toBeDisabled()

  })

})