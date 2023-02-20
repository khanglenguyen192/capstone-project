import React, { useState } from "react";
import "./index.css";

import { Breadcrumb, Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/pages/home/HomePage";
import LoginPage from "./views/pages/login/LoginPage";
import LeftSideBar from "./views/components/LeftSideBar";
import TopBar from "./views/components/TopBar";

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const App = () => {
  if (true) {
    return (
      <Router>
        <Layout>
          <LeftSideBar />
          <TopBar />
          <HomePage />
        </Layout>
      </Router>
    );
  }
};
export default App;
