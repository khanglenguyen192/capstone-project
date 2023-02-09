import React, { useState } from "react";
import "./index.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/pages/home/HomePage";
import LoginPage from "./views/pages/login/LoginPage";
import LeftSideBar from "./views/components/LeftSideBar";
import TopBar from "./views/components/TopBar";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  if (true) {
    return (
      <Router>
        <Layout>
          <LeftSideBar />
          <TopBar />
        </Layout>
      </Router>
    );
  }

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/home" element={<HomePage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "left" }}>ABC Company 2022</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};
export default App;
