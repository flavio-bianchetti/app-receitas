import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header className="header">
      <Link to="/perfil">
        <div>
          <img
            className="profileIcon"
            src={ profile }
            alt="ProfileIcon"
            data-testid="profile-top-btn"
          />
        </div>
      </Link>
      <h2 data-testid="page-title">
        {title}
      </h2>
      <div />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
