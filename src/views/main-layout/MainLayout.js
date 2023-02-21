import React from "react";
import { Outlet, Route } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div>
      <LeftSideBar />
      <div class="content-page">
        <TopBar />
        <div class="content">
          <div class="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
