import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoginDisabled, setBtnLoginDisabled] = useState(true);

  useEffect(() => {
    function checkIfLoginIsValid() {
      const maxPasswordLength = 6;
      const emailRegex = /^[\w._]+@[\w]+\.com/;
      const isEmailValid = email.match(emailRegex);
      if (password.length > maxPasswordLength && isEmailValid) {
        return setBtnLoginDisabled(false);
      }
      setBtnLoginDisabled(true);
    }
    checkIfLoginIsValid();
  }, [email, password]);

  function handleSubmit(e) {
    e.preventDefault();
    const token = 1;
    localStorage.setItem('mealsToken', JSON.stringify(token));
    localStorage.setItem('cocktailsToken', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  const loginNav = () => (
    <nav className="login-nav">
      <ul className="login-nav-list">
        <li className="login-nav-item">
          <a
            href="https://www.linkedin.com/in/brunobartolomeu/"
            className="login-nav-link"
          >
            Bruno Bart.

          </a>
        </li>
        <li className="login-nav-item">
          <a
            href="https://www.linkedin.com/in/flaviobianchetti/"
            className="login-nav-link"
          >
            Flávio Bian.
          </a>
        </li>
        <li className="login-nav-item">
          <a
            href="https://www.linkedin.com/in/erivamjr/"
            className="login-nav-link"
          >
            José Eriv.

          </a>
        </li>
        <li className="login-nav-item">
          <a
            href="https://www.linkedin.com/in/matt-pessoa/"
            className="login-nav-link"
          >
            Matheus Pess.

          </a>
        </li>
      </ul>
    </nav>
  );

  return (
    <section className="appReceitas">
      <form onSubmit={ handleSubmit } className="login-form">
        <h1>Receitas da Vovó </h1>
        <p>Faça seu login</p>
        <div>
          <label htmlFor="email">
            <input
              placeholder="Email"
              id="email"
              value={ email }
              type="text"
              data-testid="email-input"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              placeholder="Senha"
              id="password"
              type="password"
              data-testid="password-input"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ btnLoginDisabled }
        >
          Entrar
        </button>
      </form>
      <footer className="login-footer">
        {loginNav()}
      </footer>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
