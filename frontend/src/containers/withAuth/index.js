/* eslint-disable no-useless-escape */
import React, { Fragment } from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import { withCookies } from 'react-cookie';

import LoginForm from './LoginForm';
import { getMyUserInfoAndSetToStore } from '../../actions/user-info';


const mapStateToProps = ({ user }) => ({
  user,
  timestamp: user.timestamp,
  maxTimestampAge: user.maxTimestampAge
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
  lifecycle({
    componentDidMount() {
      if (
        !this.props.timestamp ||
        (() => new Date().getTime())() > this.props.timestamp + this.props.maxTimestampAge
      ) {
        this.props.dispatch(getMyUserInfoAndSetToStore({ jwt: this.props.getCookieByName('jwt') }));
      }
    },
  })
)(props => (
  <Fragment>
    {/*
      props.user.infoResponse
      ? <pre>{JSON.stringify(props.user.infoResponse)}</pre>
      : <em>No infoResponse in store</em>
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
