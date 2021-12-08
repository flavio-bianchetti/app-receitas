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

  return (
    <section>
      Login
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="email">
            Email
            <input
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
            Senha
            <input
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
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
