import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const TopBar = (props) => {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const title = useSelector((state) => {
    return state.GeneralReducer.title;
  });

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
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg">
              <div class="dropdown-item noti-title">
                <h5 class="m-0">
                  <span class="float-right">
                    <a click="markAsreadAddNotify()" class="text-dark pointer">
                      <small>Đọc tất cả</small>
                    </a>
                  </span>
                  Thông báo
                </h5>
              </div>

              <div class="slimscroll">
                <div>
                  <div style={{ background: "#EDEDF5" }}>
                    <a
                      class="dropdown-item notify-item"
                      click="notifyOnClickURL(notify.id)"
                    >
                      <div>
                        <div class="notify-icon bg-info">
                          <i class="mdi mdi-message"></i>
                        </div>
                        <div class="notify-icon bg-success">
                          <i class="mdi mdi-account-circle"></i>
                        </div>
                        <div mclass="notify-icon bg-danger">
                          <i class="mdi mdi-professional-hexagon"></i>
                        </div>
                        <div class="notify-icon bg-purple">
                          <i class="mdi mdi-calendar-remove"></i>
                        </div>
                        <div class="notify-icon bg-warning">
                          <i class="mdi mdi-timetable"></i>
                        </div>
                        <div class="notify-icon bg-primary">
                          <i class="mdi mdi-cake"></i>
                        </div>
                        <div class="notify-icon bg-secondary">
                          <i class="mdi mdi-cash-100"></i>
                        </div>
                        <div>
                          <i class="mdi mdi-battery-unknown"></i>
                        </div>
                      </div>
                      <p class="notify-details">
                        <small class="text-muted"></small>
                      </p>
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="javascript:void(0);"
                class="dropdown-item text-center text-primary notify-item notify-all"
                routerLink="/notify-list"
              >
                Xem tất cả <i class="fi-arrow-right"></i>
              </a>
            </div>
          </li>

          <li class="dropdown notification-list">
            <a
              class="nav-link dropdown-toggle nav-user"
              data-toggle="dropdown"
              href="/edit-user-profile"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <span class="ml-1">
                {user.fullName}
                <i class="mdi mdi-chevron-down"></i>{" "}
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown">
              <div class="dropdown-item noti-title">
                <h6 class="text-overflow m-0">Xin chào !</h6>
              </div>

              <a
                href="javascript:void(0);"
                class="dropdown-item notify-item"
                routerLink="/user-profile"
              >
                <i class="fi-head"></i> <span>Thông tin tài khoản</span>
              </a>

              <a
                href="javascript:void(0);"
                class="dropdown-item notify-item"
                routerLink="/change-password"
              >
                <i class="fi-lock"></i> <span>Đổi mật khẩu</span>
              </a>

              <a
                href="javascript:void(0);"
                class="dropdown-item notify-item"
                click="logOut()"
              >
                <i class="fi-power"></i> <span>Đăng xuất</span>
              </a>
            </div>
          </li>
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
