import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Cascader,
  Table,
  Tag,
  Menu,
  Dropdown,
  message,
  Button,
} from "antd";

const TopBar = (props) => {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const title = useSelector((state) => {
    return state.GeneralReducer.title;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onItemMenuClick = ({ key }) => {
    switch (key) {
      case "user-info":
        navigate("/edit-user-profile");
        break;
      case "change-password":
        navigate("/change-password");
        break;
      case "logout":
        dispatch({
          type: "LOGOUT",
        });
        break;
    }
  };

  const itemMenu = (
    <Menu onClick={onItemMenuClick}>
      <Menu.Item key="user-info">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="fi-head menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Thông tin cá nhân
        </div>
      </Menu.Item>
      <Menu.Item key="change-password">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="fi-lock menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Đổi mật khẩu
        </div>
      </Menu.Item>
      <Menu.Item key="logout">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class="fi-power menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div class="topbar">
      <nav class="navbar-custom">
        <ul class="list-unstyled topbar-right-menu float-right mb-0">
          <li class="dropdown notification-list">
            <a
              class="nav-link dropdown-toggle arrow-none"
              data-toggle="dropdown"
              href="/notification"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i class="fi-bell noti-icon"></i>
              <span class="badge badge-danger badge-pill noti-icon-badge">
                5
              </span>
            </a>
          </li>
          <Dropdown trigger={["click"]} overlay={itemMenu}>
            <li class="dropdown notification-list">
              <div class="nav-link dropdown-toggle nav-user">
                <span class="ml-1">
                  {user.fullName}
                  <i class="mdi mdi-chevron-down"></i>{" "}
                </span>
              </div>
            </li>
          </Dropdown>
        </ul>

        <ul class="list-inline menu-left mb-0">
          <li class="float-left">
            <button class="button-menu-mobile open-left disable-btn">
              <i class="dripicons-menu"></i>
            </button>
          </li>
          <li>
            <div class="page-title-box">
              <h4 class="page-title">{title}</h4>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
