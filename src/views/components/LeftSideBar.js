import React from "react";
import NoImage from "../../assets/images/no-image.jpg";
import LogoLight from "../../assets/images/logo_light.png";
import LogoSm from "../../assets/images/logo_sm.png";
import "./LeftSideBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function viewProfile() {
    navigate("/edit-user-profile");
  }

  function logOut() {
    console.log("log out");
    dispatch({
      type: "LOGOUT",
    });
  }

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
      routerLink: "/create-ticket",
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
    <div className="left side-menu">
      <div className="slimscroll-menu" id="remove-scroll">
        <div className="topbar-left">
          <a className="logo" href="/">
            <span>
              <img src={LogoLight} alt="" height="22"></img>{" "}
            </span>{" "}
            <i>
              <img src={LogoSm} alt="" height="28"></img>{" "}
            </i>{" "}
          </a>{" "}
        </div>{" "}
        <div className="user-box" onClick={viewProfile}>
          <div className="user-img">
            <img
              src={NoImage}
              alt="user-img"
              className="rounded-circle img-fluid"
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
          <ul className="metismenu">
            {" "}
            {items.map((item) => (
              <li key={item.title} className="menu-item">
                <Link to={item.routerLink}>
                  <i className={item.icon}> </i> <span> {item.title} </span>{" "}
                </Link>
              </li>
            ))}{" "}
            <li className="menu-item">
              <Link to="/home">
                <i className="menu-icon mdi mdi-content-copy"> </i>{" "}
                <span> Hồ sơ lao động </span>{" "}
              </Link>
            </li>{" "}
            <div className="user-box" id="logout" onClick={logOut}>
              <h5>
                <a> Đăng xuất </a>{" "}
              </h5>{" "}
            </div>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default LeftSideBar;
