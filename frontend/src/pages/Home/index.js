import React from 'react';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { Button, List, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const Home = compose(
  withStateHandlers((
    initialState = {
      users: []
    }) => ({
      users: initialState.users
    }),
    {
      setFieldValue: prevState => (fieldName, value) => ({
        ...prevState,
        [fieldName]: value
      }),
    }
  ),
  withHandlers({
    getUsersByRole: props => async role => {
      const response = await fetch('http://localhost:1337/users')
        .then(res => res.json())
        .catch(err => console.log(err));

      props.setFieldValue('users', [...response].filter(u => u.companyrole === 'employee'));
    }
  }),
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
          title='Отображены сотрудники с ролью employee'
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
                  description={item.bossInfo ? <div>Руководитель: {item.bossInfo.id || 'no id'}</div> : 'Руководитель не назначен'}
                />
              </List.Item>
            )}
          />
        </Card>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            getUsersByRole('employee');
          }}
        >
          Получить список сотрудников
        </Button>
      )
    }
  </div>
));

export default Home;
