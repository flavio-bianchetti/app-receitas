import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header>
      <Link to="/perfil">
        <div>
          <img
            src={ profile }
            alt="ProfileIcon"
            data-testid="profile-top-btn"
          />
        </div>
      </Link>
      <h2 data-testid="page-title">
        {title}
      </h2>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
