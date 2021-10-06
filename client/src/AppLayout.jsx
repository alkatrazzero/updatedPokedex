import React from "react";
import { Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import AuthPage from "./components/auth/AuthPage";
import { useSelector} from "react-redux";
import Routes from "./Routes";
import {LayoutHeader} from "./layout/LayoutHeader";

const AppLayout = () => {
  const isAuth = useSelector(state => state.auth.token)

  if (!isAuth) {
    return <AuthPage/>
  }
  return <Layout className={"layoutWrapper"}>
    <LayoutHeader/>
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
    <Routes/>
    </Content>
    <Footer style={{textAlign: 'center'}}>Pokemons ©2021 Created by Vibranovsky Mark</Footer>
  </Layout>
}

export default AppLayout



