import React from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import { tryToLogin } from '../../actions/user-info';
import { getUsersAndSetToStore } from '../../actions/users';


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, { userName, password }) => {
      if (!err) {
        // console.log('Received values of form: ', { userName, password });
        this.props.dispatch(tryToLogin({ userName, password }))
          .then(jwt => {
            this.props.cookies.set(
              'jwt',
              jwt,
              {
                path: '/',
                expires: new Date(Date.now() + 3600000 * 0.5), // 3600000 * 24 * 1 - One day
              },
            );
          })
          .catch(err => console.log(err));
        return Promise.resolve();
      }
      return Promise.reject();
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <Form
        layout="inline"
        onSubmit={(e) => {
          this.handleSubmit(e)
            .then(() => {
              this.props.dispatch(getUsersAndSetToStore());
            })
            .catch(err => {
              console.log(err);
            });
        }}
      >
        <Form.Item
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default compose(
  connect(),
  withCookies
)(LoginForm);
