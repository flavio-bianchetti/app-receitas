import React, { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoginDisabled, setBtnLoginDisabled] = useState(true);

  useEffect(() => {
    function checkIfLoginIsValid() {
      const maxPasswordLength = 5;
      const emailRegex = /^[\w.]+@[\w]+\.com/;
      const isEmailValid = email.match(emailRegex);
      if (password.length > maxPasswordLength && isEmailValid) {
        return setBtnLoginDisabled(false);
      }
      setBtnLoginDisabled(true);
    }
    checkIfLoginIsValid();
  }, [email, password]);
  return (
    <section>
      Login
      <form>
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

export default Login;
