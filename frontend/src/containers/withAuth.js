/* eslint-disable no-useless-escape */
import React, { Fragment } from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import axios from 'axios';
import { Alert } from 'antd';

import { updateUserInfo } from '../actions';


const mapStateToProps = ({ user }) => ({
  user,
});

const withAuth = ComposedComponent => compose(
  connect(mapStateToProps),
  withHandlers({
    // Should be refactored...
    getCookieByName: props => name => {
      const matches = document.cookie.match(new RegExp("(?:^|; )" + String(name).replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
  }),
  withHandlers({
    getMe: props => async () => {
      const response = await axios({
        method: 'get',
        url: '/users/me',
        headers: { 'Authorization': `Bearer ${props.getCookieByName('jwt')}` },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      })
        .then(res => res.data)
        .catch(err => {
          console.warn(err);
          return ({ error: `Request Failed! ${JSON.stringify(err)}` });
        });

      props.dispatch(updateUserInfo(response));
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getMe();
    },
  })
)(props => (
  <Fragment>
    {/* 1. Response was not received yet */}
    {
      !props.user.infoResponse
      ? (
        <Fragment>
          <h1>Loading...</h1>
        </Fragment>
      ) : null
    }

    {/* 2. Response received */}
    {
      props.user.infoResponse && props.user.infoResponse.error
      ? (
        <Alert
          message={props.user.infoResponse.error}
          description={props.user.infoResponse.message ? JSON.stringify(props.user.infoResponse.message) : 'No message'}
          type='warning'
        />
      ) : null
    }
    {
      props.user.infoResponse && props.user.infoResponse.statusCode
      ? (
        <Fragment>
          {((statusCode) => {
            switch (true) {
              case (statusCode >= 400 && statusCode < 500): return [
                <h1 key={Math.random()}>{props.user.infoResponse.statusCode}</h1>,
                <div key={Math.random()}>LoginForm?</div>
              ];
              default: return [
                <h1 key={Math.random()}>{props.user.infoResponse.statusCode}</h1>,
                <div key={Math.random()}>{JSON.stringify(props.user.infoResponse.message)}</div>
              ];
            }
          })(props.user.infoResponse.statusCode)}
        </Fragment>
      ) : null
    }
    {
      props.user.infoResponse && props.user.infoResponse.role
      ? <ComposedComponent />
      : null
    }
  </Fragment>
));

export default withAuth;
