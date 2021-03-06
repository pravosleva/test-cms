import React from 'react';
import { compose, lifecycle } from 'recompose';
import {
  // Button,
  List, Card, Avatar,
  notification,
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  withAuth,
} from '../../containers';
import { getUsersAndSetToStore } from '../../actions/users';

const mapStateToProps = ({ users }) => ({
  users: users.items
});
const Home = compose(
  withAuth,
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(getUsersAndSetToStore())
        // .then(() => {})
        .catch(err => {
          notification.error({
            message: (err.statusCode ? `${err.statusCode} ` : '') + (err.error || 'Fuckup'),
            description: err.message || 'Request failed',
          });
        });
    }
  })
)(({
  getUsersByRole,
  users
}) => (
  <div>
    <h1>Home</h1>
    {
      users && users.length > 0
      ? (
        <Card
          title='Отображены все сотрудники'
        >
          <List
            itemLayout="horizontal"
            dataSource={[...users].map(u => ({
              id: u.id,
              title: u.username,
              src: u.photo && u.photo.url ? u.photo.url : 'https://yt3.ggpht.com/a-/AAuE7mA_A0OnIv4b0BsRorlPvNukiDDXIci4iZdGYQ=s900-mo-c-c0xffffffff-rj-k-no',
              description: u.companyrole,
              bossInfo: u.bossInfo || null
            }))}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size={64} src={item.src} />}
                  title={<Link to={`/info/${item.id}`}>{item.title}</Link>}
                  description={
                    <div onClick={() => console.log(item.id)}>
                      {
                        item.bossInfo && item.bossInfo.id
                        ? <div>Руководитель: {item.bossInfo.id}</div>
                        : `bossInfo is ${JSON.stringify(item.bossInfo)}`
                      }
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      ) : (
        <em>Список пуст</em>
      )
    }
  </div>
));

export default Home;
