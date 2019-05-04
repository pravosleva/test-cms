import React, { Fragment } from 'react';
import { compose } from 'recompose';

import Routes from './routes';
import {
  withMaxWidthContainer,
  withAuth,
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
  withAuth,
)(App);
