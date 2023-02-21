import React, { useState } from "react";
import "./index.css";

import { Breadcrumb, Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/pages/home/HomePage";
import LoginPage from "./views/pages/login/LoginPage";
import LeftSideBar from "./views/components/LeftSideBar";
import TopBar from "./views/components/TopBar";
import MainLayout from "./views/main-layout/MainLayout";
import DayOffPage from "./views/pages/dayoff/DayOffPage";

const App = () => {
  if (true) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="day-off" element={<DayOffPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }
};
export default App;
