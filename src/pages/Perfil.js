import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify({ email: 'alguem@alguem.com' }));
      setUser({ email: 'alguem@alguem.com' });
    } else {
      const userInStorage = JSON.parse(localStorage
        .getItem('user'));
      setUser(userInStorage);
    }
  }, []);

  function redirectButton(e) {
    const { name } = e.target;
    history.push(name);
  }

  function exitButton() {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/'); // tratar erro quando clica em retornar para pagina
  }

  return (
    user && (
      <>
        <Header title="Perfil" />
        <div className="pages-background">
          <section className="profile-content">
            <div className="wordBreak">
              <h3 data-testid="profile-email">{user.email}</h3>
            </div>
            <button
              className="profileBtn"
              type="button"
              name="/receitas-feitas"
              data-testid="profile-done-btn"
              onClick={ (e) => redirectButton(e) }
            >
              Receitas Feitas
            </button>
            <button
              className="profileBtn"
              type="button"
              name="/receitas-favoritas"
              data-testid="profile-favorite-btn"
              onClick={ (e) => redirectButton(e) }
            >
              Receitas Favoritas
            </button>
            <button
              className="profileBtn"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ exitButton }
            >
              Sair
            </button>
          </section>
          <Footer />
        </div>
      </>
    )

  );
}

export default Perfil;
