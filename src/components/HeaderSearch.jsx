import React from 'react';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header>
      <div>
        <img src={ profile } alt="ProfileIcon" data-testid="profile-top-btn" />
      </div>
      <h2 data-testid="page-title">
        {title}
      </h2>
      <div>
        <img src={ search } alt="searchIcon" data-testid="search-top-btn" />
      </div>
    </header>
  );
}

export default Header;
