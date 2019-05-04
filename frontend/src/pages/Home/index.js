import React from 'react';
import { compose, lifecycle } from 'recompose';
import {
  // Button,
  List, Card, Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { withUsers } from '../../containers';
import { updateUsers } from '../../actions/users';

const mapStateToProps = ({ users }) => ({
  users: users.items
});
const Home = compose(
  // withUsers,
  connect(mapStateToProps),
  lifecycle({
    async componentDidMount() {
      // this.props.getUsersByRole('employee');

      const response = await fetch('/users')
        .then(res => res.json())
        .catch(err => console.log(err));

      if (response) {
        this.props.dispatch(updateUsers(response));
      }
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
              photo: u.photo ? 'http://localhost:1337' + u.photo.url : 'https://yt3.ggpht.com/a-/AAuE7mA_A0OnIv4b0BsRorlPvNukiDDXIci4iZdGYQ=s900-mo-c-c0xffffffff-rj-k-no',
              description: u.companyrole,
              bossInfo: u.bossInfo || null
            }))}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.photo} />}
                  title={<Link to={`/info/${item.id}`}>{item.title}</Link>}
                  description={
                    <div onClick={() => console.log(item.id)}>
                      {
                        item.bossInfo
                        ? <div>Руководитель: {item.bossInfo.id || `Поле id не найдено! bossInfo is ${JSON.stringify(item.bossInfo)}`}</div>
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
