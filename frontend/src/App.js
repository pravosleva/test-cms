import React, { Fragment } from 'react';

import Routes from './routes';
import withAuth from './withAuth';

function App() {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
}

export default withAuth(App);
