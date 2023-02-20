import React from "react";
import NoImage from "../../assets/images/no-image.jpg";
import LogoLight from "../../assets/images/logo_light.png";
import LogoSm from "../../assets/images/logo_sm.png";
import "./LeftSideBar.css";

const LeftSideBar = () => {
  const user = {
    fullname: "Lê Nguyên Khang",
  };

  const items = [
    {
      icon: "fi-air-play",
      routerLink: "/labour-contract",
      title: "Trang chủ",
    },
    {
      icon: "mdi mdi-note-text menu-icon",
      routerLink: "/labour-contract",
      title: "Daily Report",
    },
    {
      icon: "mdi mdi-account-multiple menu-icon",
      routerLink: "/labour-contract",
      title: "Đồng nghiệp",
    },
    {
      icon: "mdi mdi-note-multiple-outline menu-icon",
      routerLink: "/",
      title: "Dự án",
    },
    {
      icon: "mdi mdi-sitemap menu-icon",
      routerLink: "/",
      title: "Phòng ban",
    },
    {
      icon: "mdi mdi-message-video menu-icon",
      routerLink: "/",
      title: "Hội họp",
    },
    {
      icon: "mdi mdi-calendar-today menu-icon",
      routerLink: "/",
      title: "Ngày nghỉ",
    },
    {
      icon: "mdi mdi-account-network menu-icon",
      routerLink: "/",
      title: "Làm việc từ xa",
    },
    {
      icon: "mdi mdi-av-timer menu-icon",
      routerLink: "/",
      title: "Tăng ca",
    },
    {
      icon: "mdi mdi-cash-multiple menu-icon",
      routerLink: "/",
      title: "Ứng lương",
    },
    {
      icon: "mdi mdi-file-document-box menu-icon",
      routerLink: "/",
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
                <a routerLink={item.routerLink}>
                  <i class={item.icon}> </i> <span> {item.title} </span>{" "}
                </a>{" "}
              </li>
            ))}{" "}
            <li class="menu-item">
              <a click="getLabourContract()">
                <i class="menu-icon mdi mdi-content-copy"> </i>{" "}
                <span> Hồ sơ lao động </span>{" "}
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div class="clearfix"> </div>{" "}
      </div>{" "}
    </div>
  );
};

export default LeftSideBar;
