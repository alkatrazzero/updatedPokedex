import {Link, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {FavoritePokemons} from "./components/RenderPokemons/FavoritePokemons";
import {TierListPokemons} from "./components/tierListPokemons/tierList";
import React from "react";
import { Col, Dropdown, Layout, Menu, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import AuthPage from "./components/auth/AuthPage";
import {useDispatch, useSelector} from "react-redux";
import Profile from "./components/profile/profile";
import {DownOutlined} from "@ant-design/icons";
import Body from "./components/Body";
import {resetApp} from "./store/store";

const UseRoutes = () => {
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
  const isAuth = useSelector(state => state.auth.token)
  const params = useLocation()

  if (!isAuth) {
    return <AuthPage/>
  }
  return <Layout className={"layoutWrapper"}>

    <Header className="header">
      <div className="logo"/>
      <Row className={"headerMenu"} gutter={24}>
        <Col span={16}>
          <Menu theme="dark" mode="horizontal" selectedKeys={[params.pathname || "/Profile"]}>
            <Menu.Item  key="/MyProfile"><Link to={"/Profile"}>My profile</Link></Menu.Item>
            <Menu.Item key="/pokemons"><Link to={"/Pokemons"}>All Pokemons</Link></Menu.Item>
            <Menu.Item key="/FavoritePokemons"><Link to={"/Favorite-pokemons"}>Favorite Pokemons</Link></Menu.Item>
            <Menu.Item key="/PokemonsTierList"><Link to={"/Pokemons-tier-list"}> Pokemons tier list</Link></Menu.Item>
          </Menu>
        </Col>
        <Col className={"headerMenu__column"} span={8}>
          <div>
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {userData} <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>

        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route exact path={"/Profile"}>
              <Profile/>
              </Route>
            <Route exact path={"/Favorite-pokemons"} render={() => <FavoritePokemons/>}/>
            <Route exact path={"/Pokemons"} render={() => <Body/>}/>
            <Route exact path={"/Pokemons-tier-list"} render={() => <TierListPokemons/>}/>
            <Redirect to={"/MyProfile"}/>
          </Switch>
        </Content>


    <Footer style={{textAlign: 'center'}}>Pokemons ©2021 Created by Vibranovsky Mark</Footer>
  </Layout>
}

export default UseRoutes



