import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import AppDeReceitasProvider from './context/AppDeReceitasProvider';

const renderWithRouterAndProvider = (component, route = '/') => {
  const history = createMemoryHistory();
  history.push(route);
  return ({ ...render(
    <AppDeReceitasProvider>
      <Router history={ history }>
        {component}
      </Router>
    </AppDeReceitasProvider>,
  ),
  history });
};

export default renderWithRouterAndProvider;
