import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Info from '../pages/Info';

const MainFlexWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;
const Content = styled('div')`
  width: 100%;
  padding: 10px;

  @media(min-width: 768px) {
    max-width: 900px;
  }
  @media(min-width: 767px) {

  }
`;

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
  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired
  // }

  render() {
    return (
      <BrowserRouter>
        <MainFlexWrapper>
          <Content>
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
          </Content>
        </MainFlexWrapper>
      </BrowserRouter>
    );
  }
}

export default Routes;
