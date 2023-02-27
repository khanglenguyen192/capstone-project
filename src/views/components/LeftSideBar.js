import React from "react";
import NoImage from "../../assets/images/no-image.jpg";
import LogoLight from "../../assets/images/logo_light.png";
import LogoSm from "../../assets/images/logo_sm.png";
import "./LeftSideBar.css";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  const user = {
    fullname: "Lê Nguyên Khang",
  };

  const items = [
    {
      icon: "fi-air-play",
      routerLink: "/home",
      title: "Trang chủ",
    },
    {
      icon: "mdi mdi-note-text menu-icon",
      routerLink: "/daily-report",
      title: "Daily Report",
    },
    {
      icon: "mdi mdi-account-multiple menu-icon",
      routerLink: "/users",
      title: "Đồng nghiệp",
    },
    {
      icon: "mdi mdi-note-multiple-outline menu-icon",
      routerLink: "/projects",
      title: "Dự án",
    },
    {
      icon: "mdi mdi-sitemap menu-icon",
      routerLink: "/department",
      title: "Phòng ban",
    },
    {
      icon: "mdi mdi-message-video menu-icon",
      routerLink: "/meeting",
      title: "Hội họp",
    },
    {
      icon: "mdi mdi-calendar-today menu-icon",
      routerLink: "/day-off",
      title: "Ngày nghỉ",
    },
    {
      icon: "mdi mdi-account-network menu-icon",
      routerLink: "/work-remote",
      title: "Làm việc từ xa",
    },
    {
      icon: "mdi mdi-av-timer menu-icon",
      routerLink: "/overtime",
      title: "Tăng ca",
    },
    {
      icon: "mdi mdi-cash-multiple menu-icon",
      routerLink: "/advanced-salary",
      title: "Ứng lương",
    },
    {
      icon: "mdi mdi-file-document-box menu-icon",
      routerLink: "/salary-detail",
      title: "Bảng lương",
    },
  ];

  return (
    <div class="left side-menu">
      <div class="slimscroll-menu" id="remove-scroll">
        <div class="topbar-left">
          <a class="logo">
            <span>
              <img src={LogoLight} alt="" height="22"></img>{" "}
            </span>{" "}
            <i>
              <img src={LogoSm} alt="" height="28"></img>{" "}
            </i>{" "}
          </a>{" "}
        </div>{" "}
        <div class="user-box" click="viewProfile()">
          <div class="user-img">
            <img
              src={NoImage}
              alt="user-img"
              class="rounded-circle img-fluid"
              style={{
                height: "48px",
                width: "48px",
              }}
            ></img>{" "}
          </div>{" "}
          <h5>
            <a> {user.fullname} </a>{" "}
          </h5>{" "}
        </div>{" "}
        <div id="sidebar-menu">
          <ul class="metismenu">
            {" "}
            {items.map((item) => (
              <li class="menu-item">
                <Link to={item.routerLink}>
                  <i class={item.icon}> </i> <span> {item.title} </span>{" "}
                </Link>
              </li>
            ))}{" "}
            <li class="menu-item">
              <Link to="/home">
                <i class="menu-icon mdi mdi-content-copy"> </i>{" "}
                <span> Hồ sơ lao động </span>{" "}
              </Link>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div class="clearfix"> </div>{" "}
      </div>{" "}
    </div>
  );
};

export default LeftSideBar;
