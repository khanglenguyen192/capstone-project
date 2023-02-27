import React, { useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./views/main-layout/MainLayout";
import HomePage from "./views/pages/home/HomePage";
import LoginPage from "./views/pages/login/LoginPage";
import DayOffPage from "./views/pages/dayoff/DayOffPage";
import DailyReportPage from "./views/pages/daily-report/DailyReportPage";
import EditDailyReportPage from "./views/pages/edit-daily-report/EditDailyReportPage";

const App = () => {
  var isLoggedIn = true;

  if (isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="day-off" element={<DayOffPage />} />
            <Route path="daily-report" element={<DailyReportPage />} />
            <Route path="edit-daily-report" element={<EditDailyReportPage />} />
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
