import PropTypes from 'prop-types';
import React from 'react';

function HeaderHeader({ title }) {
  return (
    <header className="headerheader header">
      <h2 data-testid="page-title">
        {title}
      </h2>
    </header>
  );
}

HeaderHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderHeader;
