import React from "react";
import NoImage from "../../assets/images/no-image.jpg";
import LogoLight from "../../assets/images/logo_light.png";
import LogoSm from "../../assets/images/logo_sm.png";
import Logo from "../../assets/images/logo_light_bg.png";
import "./LeftSideBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../common/utils/Utils";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  function viewProfile() {
    navigate("/edit-user-profile");
  }

  function logOut() {
    dispatch({
      type: "LOGOUT",
    });
  }

  const items = [
    {
      icon: "fi-air-play",
      routerLink: "/home",
      title: "Trang chủ",
    },
    {
      icon: "mdi mdi-note-multiple-outline menu-icon",
      routerLink: "/projects",
      title: "Dự án",
    },
    {
      icon: "mdi mdi-sitemap menu-icon",
      routerLink: "/departments",
      title: "Phòng ban",
    },
    {
      icon: "mdi mdi-note-text menu-icon",
      routerLink: "/tickets",
      title: "Công việc",
    },
    {
      icon: "mdi mdi-message-video menu-icon",
      routerLink: "meeting",
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
          <a className="logo" href="/" style={{ color: "white" }}>
            <span
              style={{ textTransform: "none", fontFamily: "Brush Script MT" }}
            >
              <img
                src={Logo}
                alt=""
                height="50"
                style={{
                  borderRadius: "10%",
                  marginRight: "5px",
                }}
              ></img>
              HighAdmin
            </span>
          </a>
        </div>
        <div className="user-box" onClick={viewProfile}>
          <div className="user-img">
            <img
              src={Utils.getImageUrl(user.avatar)}
              alt="user-img"
              className="rounded-circle img-fluid"
              style={{
                height: "48px",
                width: "48px",
              }}
            ></img>
          </div>
          <h5>
            <a> {user.fullName} </a>
          </h5>
        </div>
        <div id="sidebar-menu">
          <ul className="metismenu">
            {items.map((item) => (
              <li key={item.title} className="menu-item">
                <Link to={item.routerLink}>
                  <i className={item.icon}> </i>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            {user.userId == 1 && (
              <li className="menu-item">
                <Link to="/add-user">
                  <i className="mdi mdi-account-multiple menu-icon"> </i>
                  <span> Thêm nhân viên </span>
                </Link>
              </li>
            )}
            <div className="user-box" id="logout" onClick={logOut}>
              <h5>
                <a> Đăng xuất </a>
              </h5>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
