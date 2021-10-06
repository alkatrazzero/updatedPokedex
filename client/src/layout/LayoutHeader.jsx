import {Col, Dropdown, Menu, Row} from "antd";
import {Link, useLocation} from "react-router-dom";
import {DownOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetApp} from "../store/store";


export const LayoutHeader=()=>{
  const dispatch = useDispatch()
  const logoutDispatch = async () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('userEmail')
    dispatch(resetApp())

  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={logoutDispatch} href="">Logout</a>
      </Menu.Item>
    </Menu>
  );
  const userData = useSelector(state => state.auth.userData)
  const params = useLocation()

  return <Header className="header">
    <div className="logo"/>
    <Row className={"headerMenu"} gutter={24}>
      <Col span={16}>
        <Menu theme="dark" mode="horizontal" selectedKeys={[params.pathname || "/Profile"]}>
          <Menu.Item key="/MyProfile"><Link to={"/Profile"}>My profile</Link></Menu.Item>
          <Menu.Item key="/pokemons"><Link to={"/Pokemons"}>All Pokemons</Link></Menu.Item>
          <Menu.Item key="/FavoritePokemons"><Link to={"/Favorite-pokemons"}>Favorite Pokemons</Link></Menu.Item>
          <Menu.Item key="/PokemonsTierList"><Link to={"/Pokemons-tier-list"}> Pokemons tier list</Link></Menu.Item>
        </Menu>
      </Col>
      <Col className={"headerMenu__column"} span={8}>
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {userData} <DownOutlined/>
            </a>
          </Dropdown>
        </div>
      </Col>
    </Row>
  </Header>
}
