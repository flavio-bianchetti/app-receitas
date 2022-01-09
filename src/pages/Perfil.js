import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const [user, setUser] = useState('');
  const history = useHistory();
  useEffect(() => {
    const userInStorage = JSON.parse(localStorage
      .getItem('user'));
    setUser(userInStorage);
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
    <div>
      <Header title="Perfil" />
      <h3 data-testid="profile-email">{user.email}</h3>

      <button
        type="button"
        name="/receitas-feitas"
        data-testid="profile-done-btn"
        onClick={ (e) => redirectButton(e) }
      >
        Receitas Feitas

      </button>
      <button
        type="button"
        name="/receitas-favoritas"
        data-testid="profile-favorite-btn"
        onClick={ (e) => redirectButton(e) }
      >
        Receitas Favoritas

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ exitButton }
      >
        Sair

      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
