import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Info from '../pages/Info';


const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Home />
  },
  {
    path: '/info/:id',
    exact: true,
    component: () => <Info />
  }
];

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {
            routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          }
          <Route exact path='/*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
