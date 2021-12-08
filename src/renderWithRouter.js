import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component, rota = '/') => {
  const history = createMemoryHistory();
  history.push(rota);
  return ({ ...render(<Router history={ history }>{component}</Router>),
    history });
};

export default renderWithRouter;
