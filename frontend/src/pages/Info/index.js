
import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { compose, withStateHandlers, withHandlers, lifecycle } from 'recompose';
import {
  Card,
  // Icon,
  // Avatar,
  notification,
} from 'antd';

import {
  withAuth,
} from '../../containers';
import ArrowBackSVG from '../../components/SVG/ArrowBackSVG';

const { Meta } = Card;
const Info = compose(
  withAuth,
  withRouter,
  withStateHandlers((
    initialState = {
      infoResponse: null
    }) => ({
      infoResponse: initialState.infoResponse
    }),
    {
      setFieldValue: prevState => (fieldName, value) => ({
        ...prevState,
        [fieldName]: value
      }),
    }
  ),
  withHandlers({
    getInfo: props => async role => {
      const response = await fetch(`/users/${props.match.params.id}`)
        .then(originRes => {
          if (originRes.status !== 200) {
            throw originRes;
          }

          return originRes;
        })
        .then(originRes => originRes.json())
        .catch(err => {
          notification.error({
            message: `Respose status= ${err.status}`,
            description: err.statusText,
            onClick: () => {
              console.log(err);
            },
          });

          return {
            statusCode: err.status,
            message: err.statusText,
            error: err.url
          };
        });

      props.setFieldValue('infoResponse', response);
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.getInfo();
    }
  }),
)(({
  infoResponse
}) => (
  <div>
    <h1><Link to='/'><ArrowBackSVG /></Link> Info</h1>

    {
      infoResponse && infoResponse.id ? (
        <Card
          style={{ width: 300 }}
          // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          cover={
            <img
              alt="img"
              src={
                infoResponse && infoResponse.photo && infoResponse.photo.url
                ? infoResponse.photo.url
                : "https://yt3.ggpht.com/a-/AAuE7mA_A0OnIv4b0BsRorlPvNukiDDXIci4iZdGYQ=s900-mo-c-c0xffffffff-rj-k-no"
              }
            />
          }
          // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Meta
            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            // title={infoResponse.username}
            description={
              infoResponse.bossInfo && infoResponse.bossInfo.id
              ? <div>Руководитель: {infoResponse.bossInfo.id}</div>
              : `bossInfo is ${JSON.stringify(infoResponse.bossInfo)}`
            }
          />
        </Card>
      ) : null
    }

    {
      infoResponse && infoResponse.statusCode === 404
      ? (
        <Redirect to='/not-found' />
      ) : null
    }
  </div>
));

export default Info;
