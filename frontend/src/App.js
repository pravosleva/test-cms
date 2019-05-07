import React, { Fragment } from 'react';
import { compose } from 'recompose';

import Routes from './routes';
import {
  withMaxWidthContainer,
  // withUsers,
  // withAuth, // Обернул каждый из компонентов, требующий авторизации
} from './containers';

function App() {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
}

export default compose(
  withMaxWidthContainer,
  // withUsers,
  // withAuth,
)(App);
