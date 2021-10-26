import React from 'react';
import {
  Button, Form, Input, message, Space,
} from 'antd';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../api';
import './auth.css';
import { setUserData, setUserToken } from '../../store/auth/authActions';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = async ({ email, password }) => {
    const response = await authAPI.login({ email, password });
    const { token } = response.data;
    if (response.data.token) {
      dispatch(setUserData(email));
      dispatch(setUserToken(response.data.token));
      localStorage.setItem('userEmail', JSON.stringify(email));
      localStorage.setItem('userData', JSON.stringify((token)));
    } else return message.error(response.data.message);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login_container">
      <div className="login">login</div>
      <div className="login_form">

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Введите email', type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Минимальная длина пароля 6 символов!', min: 6 }]}
          >
            <Input.Password />
          </Form.Item>

          <Space>
            <Button type="primary" htmlType="submit">
              login
            </Button>
          </Space>
        </Form>

      </div>
    </div>
  );
};
