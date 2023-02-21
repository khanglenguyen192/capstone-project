import React from "react";
import { Outlet, Route } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <LeftSideBar />
      <div class="content-page">
        <TopBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
