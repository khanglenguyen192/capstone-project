import React, { useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/pages/home/HomePage";
import LoginPage from "./views/pages/login/LoginPage";
import DayOffPage from "./views/pages/dayoff/DayOffPage";
import MainLayout from "./views/main-layout/MainLayout";
import DepartmentPage from "./views/pages/department/DepartmentPage";

const App = () => {
  var isLoggedIn = true;

  if (isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="department" element={<DepartmentPage />} />
            <Route path="day-off" element={<DayOffPage />} />
          </Route>
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/*" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }
};
export default App;
