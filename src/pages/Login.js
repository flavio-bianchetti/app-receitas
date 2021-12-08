import React from 'react';

function Login() {
  return (
    <section>
      Login
      <form>
        <div>
          <label htmlFor="email">
            Email
            <input id="email" type="text" data-testid="email-input" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Senha
            <input id="password" type="password" data-testid="password-input" />
          </label>
        </div>
        <button type="submit" data-testid="login-submit-btn">Entrar</button>
      </form>
    </section>
  );
}

export default Login;
