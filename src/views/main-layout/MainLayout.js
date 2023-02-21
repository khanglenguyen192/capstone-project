import React from "react";
import { Outlet, Route } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";
import TopBar from "../components/TopBar";

const MainLayout = () => {
  return (
    <div>
      <LeftSideBar />
      <div class="content-page">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
