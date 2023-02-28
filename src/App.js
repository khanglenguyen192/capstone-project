import React, { useState } from "react";
import "./index.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./views/main-layout/MainLayout";
import HomePage from "./views/pages/home/HomePage";
import LoginPage from "./views/pages/login/LoginPage";
import DayOffPage from "./views/pages/dayoff/DayOffPage";
import DailyReportPage from "./views/pages/daily-report/DailyReportPage";
import EditDailyReportPage from "./views/pages/edit-daily-report/EditDailyReportPage";
import MeetingPage from "./views/pages/meeting/MeetingPage";
import UsersPage from "./views/pages/user/users/UsersPage";
import WorkRemotePage from "./views/pages/work-remote/WorkRemotePage";
import SalaryDetailPage from "./views/pages/salary-detail/SalaryDetailPage";
import EditUserProfilePage from "./views/pages/user/edit-user-profile/EditUserProfilePage";
import ListProjectPage from "./views/pages/project/list-project/ListProjectPage";
import AddProjectPage from "./views/pages/project/add-project/AddProjectPage";

const App = () => {
  //TODO: Hard code data
  var isLoggedIn = true;
  var userName = "Lê Nguyên Khang";

  if (isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="day-off" element={<DayOffPage />} />
            <Route path="daily-report" element={<DailyReportPage />} />
            <Route path="edit-daily-report" element={<EditDailyReportPage />} />
            <Route path="meeting" element={<MeetingPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route
              path="work-remote"
              element={<WorkRemotePage userName={userName} />}
            />
            <Route path="/salary-detail" element={<SalaryDetailPage />} />
            <Route
              path="/edit-user-profile"
              element={<EditUserProfilePage />}
            />
            <Route path="/projects" element={<ListProjectPage />} />
            <Route path="/add-project" element={<AddProjectPage />} />
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
