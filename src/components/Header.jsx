import PropTypes from 'prop-types';
import React from 'react';
import profile from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header>
      <div>
        <img src={ profile } alt="ProfileIcon" data-testid="profile-top-btn" />
      </div>
      <h2 data-testid="page-title">
        {title}
      </h2>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
