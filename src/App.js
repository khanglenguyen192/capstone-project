import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import DepartmentPage from "./views/pages/department/DepartmentPage";
import AddProjectPage from "./views/pages/project/add-project/AddProjectPage";
import NotificationPage from "./views/pages/notification/NotificationPage";
import OvertimePage from "./views/pages/overtime/OvertimePage";
import DepartmentUsersPage from "./views/pages/department/DepartmentUsersPage";
import CreateTicketPage from "./views/pages/ticket/CreateTicketPage";
import ManageTicketPage from "./views/pages/ticket/ManageTicketPage";
import CreateReportPage from "./views/pages/report/CreateReportPage";
import AddUserPage from "./views/pages/user/AddUserPage";
import AddDepartmentUserPage from "./views/pages/department/AddDepartmentUser";
import ComingSoonPage from "./views/pages/general/ComingSoonPage";
import ManageRequestPage from "./views/pages/request/ManageRequestPage";
import ManageOverTimePage from "./views/pages/overtime/ManageOverTimePage";

const App = () => {
  const isLoggedIn = useSelector((state) => {
    return state.AuthReducer.isLoggedIn;
  });

  const userName = useSelector((state) => {
    return state.AuthReducer.fullName;
  });

  if (isLoggedIn) {
    return (
      <div>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="login" element={<Navigate to="../home" />} />
              <Route path="home" element={<HomePage />} />
              <Route path="day-off" element={<DayOffPage />} />
              <Route path="daily-report" element={<DailyReportPage />} />
              <Route
                path="edit-daily-report"
                element={<EditDailyReportPage />}
              />
              <Route path="meeting" element={<ComingSoonPage />} />
              <Route path="overtime" element={<OvertimePage />} />
              <Route path="department" element={<DepartmentPage />} />
              <Route path="departments" element={<DepartmentPage />} />
              <Route
                path="departments/:departmentId"
                element={<DepartmentPage />}
              />
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
              <Route path="/notification" element={<NotificationPage />} />
              <Route
                path="/department-users/:departmentId"
                element={<DepartmentUsersPage />}
              />
              <Route path="/create-ticket" element={<CreateTicketPage />} />
              <Route
                path="/department/:departmentId/user/:userId/add-ticket"
                element={<CreateTicketPage />}
              />
              <Route
                path="/edit-ticket/:ticketId"
                element={<CreateTicketPage />}
              />
              <Route path="/tickets" element={<ManageTicketPage />} />
              <Route
                path="department/:departmentId/tickets"
                element={<ManageTicketPage />}
              />
              <Route
                path="department/:departmentId/user/:userId/tickets"
                element={<ManageTicketPage />}
              />
              <Route
                path="/ticket/:ticketId/create-report"
                element={<CreateReportPage />}
              />
              <Route path="/report/:reportId" element={<CreateReportPage />} />
              <Route path="/add-user" element={<AddUserPage />} />
              <Route
                path="department/:departmentId/add-users"
                element={<AddDepartmentUserPage />}
              />
              <Route path="/advanced-salary" element={<ComingSoonPage />} />
              <Route path="/manage-request" element={<ManageRequestPage />} />
              <Route
                path="/department/:departmentId/requests"
                element={<ManageRequestPage />}
              />
              <Route path="/manage-overtime" element={<ManageOverTimePage />} />
            </Route>
            {/* <Route path="/test" element={<LoginPage />}></Route> */}
          </Routes>
        </Router>
      </div>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="login" />} />
        </Routes>
      </Router>
    );
  }
};
export default App;
