/* eslint-disable no-useless-escape */
import React, { Fragment } from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import axios from 'axios';
import { Alert } from 'antd';
import { withCookies } from 'react-cookie';

import LoginForm from './LoginForm';

import { updateUserInfo } from '../../actions/user-info';


const mapStateToProps = ({ user }) => ({
  user,
});

const withAuth = ComposedComponent => compose(
  withCookies,
  connect(mapStateToProps),
  withHandlers({
    getCookieByName: props => cookieName => {
      // v1
      // const matches = document.cookie.match(new RegExp("(?:^|; )" + String(cookieName).replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      // return matches ? decodeURIComponent(matches[1]) : undefined;

      // v2
      return props.cookies.get(cookieName);
    }
  }),
  withHandlers({
    setResponse: props => res => {
      props.dispatch(updateUserInfo(res));
    }
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
          return ({
            error: 'Request failed!',
            statusCode: err.response.status,
            message: err.response.data
          });
        });

      props.setResponse(response);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getMe();
    },
  })
)(props => (
  <Fragment>
    {/*
      props.user.infoResponse
      ? (
        <pre>{JSON.stringify(props.user.infoResponse)}</pre>
      ) : <em>No infoResponse in store</em>
    */}

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
      props.user.infoResponse && (props.user.infoResponse.error || props.user.infoResponse.statusCode)
      ? (
        <Alert
          message={`${props.user.infoResponse.statusCode ? `${props.user.infoResponse.statusCode} ` : ''}${props.user.infoResponse.error}`}
          description={
            props.user.infoResponse.message
            ? (
              typeof props.user.infoResponse.message === 'string'
              ? props.user.infoResponse.message
              : JSON.stringify(props.user.infoResponse.message)
            ) : 'No message'
          }
          type='warning'
          style={{ marginBottom: '20px' }}
        />
      ) : null
    }
    {
      props.user.infoResponse &&
      props.user.infoResponse.statusCode // Если strapi прислал это поле, значит что-то пошло не так
      ? (
        <Fragment>
          {((statusCode) => {
            switch (true) {
              case (statusCode >= 400 && statusCode < 500): return [
                <LoginForm key={Math.random()} />
              ];
              default:
                // return (
                //   <div>
                //     {
                //       props.user.infoResponse.message
                //       ? (
                //         typeof props.user.infoResponse.message === 'string'
                //         ? props.user.infoResponse.message
                //         : JSON.stringify(props.user.infoResponse.message)
                //       ) : 'No message'
                //     }
                //   </div>
                // );
                return null;
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
