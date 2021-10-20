import {
  Col, Dropdown, Menu, Row,
} from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { useSelector } from 'react-redux';

export const LayoutHeader = () => {
  const logoutDispatch = async () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userEmail');
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={logoutDispatch} href="">Logout</a>
      </Menu.Item>
    </Menu>
  );
  const { userData } = useSelector((state) => state.auth);

  return (
    <Header className="header">
      <div className="logo" />
      <Row className="headerMenu" gutter={24}>
        <Col span={16}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="/MyProfile"><Link to={`/Profile${userData}`}>My profile</Link></Menu.Item>
            <Menu.Item key="/pokemons"><Link to="/Pokemons">All Pokemons</Link></Menu.Item>
            <Menu.Item key="/FavoritePokemons"><Link to="/Favorite-pokemons">Favorite Pokemons</Link></Menu.Item>
          </Menu>
        </Col>
        <Col className="headerMenu__column" span={8}>
          <div>
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                {userData}
                {' '}
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  );
};
