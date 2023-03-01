import React from "react";
import "./HomePage.css";

export default function HomePage() {
  const user = {
    fullname: "Lê Nguyên Khang",
    birthday: "",
    phone: "",
    email: "",
    workingTimeCounting: "",
    dateJoincompany: "",
    lastLogin: "",
  };

  const cash = {};

  const date = "";

  const appNumber = "";

  const data = {};

  const request = {};

  const userIndex = {
    totalProjects: "1",
    dayOffInYear: "1",
    totalDayOffInYear: "11",
  };

  return (
    <div class="row">
      <div class="col-xl-4">
        <div class="card-box">
          <h4 class="header-title mt-0 m-b-20">Thông tin cá nhân</h4>
          <div class="panel-body">
            <p class="text-muted font-13">Thông tin cơ bản nhân viên</p>

            <hr />

            <div class="text-left">
              <p class="text-muted font-13">
                <strong>Ngày sinh: </strong>{" "}
                <span class="m-l-15">{user.birthday}</span>
              </p>

              <p class="text-muted font-13">
                <strong>SĐT: </strong>
                <span class="m-l-15">{user.phone}</span>
              </p>

              <p class="text-muted font-13">
                <strong>Email: </strong>{" "}
                <span class="m-l-15">{user.email}</span>
              </p>

              <p class="text-muted font-13">
                <strong>Thời gian đã làm ở công ty: </strong>{" "}
                <span class="m-l-15">{user.workingTimeCounting}</span>
              </p>

              <p class="text-muted font-13">
                <strong>Thời gian vào công ty: </strong>{" "}
                <span class="m-l-15">{user.dateJoincompany}</span>
              </p>

              <p class="text-muted font-13">
                <strong>Lần truy cập gần nhất: </strong>
                <span class="m-l-15">{user.lastLogin}</span>
              </p>

              <p class="text-muted font-13">
                <strong>Múi giờ: </strong>{" "}
                <span class="m-l-15">{user.timeZoneName}</span>
              </p>
            </div>

            <ul class="social-links list-inline m-t-20 m-b-0">
              <li class="list-inline-item">
                <a
                  title=""
                  data-placement="top"
                  data-toggle="tooltip"
                  class="tooltips"
                  href="https://www.facebook.com/{user.facebookId}"
                  data-original-title="Facebook"
                >
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  title="{user.skypeId}"
                  data-placement="top"
                  data-toggle="tooltip"
                  class="tooltips"
                  data-original-title="Skype"
                >
                  <i class="fa fa-skype"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a id="tooltip-salary">
                  <i class="fa fa-usd"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-box ribbon-box">
          <div class="ribbon ribbon-info">Danh sách tạm ứng lương</div>
          <div class="clearfix"></div>
          <div class="inbox-widget  slimscroll">
            {/* <div class="inbox-item" title="Lí do ứng lương: {{cash.reason}}">
              <p class="inbox-item-author">Tạm ứng lương</p>
              <p class="inbox-item-text">
                Bạn đã yêu cầu tạm ứng số tiền
                <span class="font-500 text-dark">
                  {cash.cash | appNumber} VNĐ{" "}
                </span>
                vào ngày
                <span class="font-500 text-dark">{cash.dateTime | date}</span>
              </p>
              <p class="inbox-item-date m-t-10">
                <span class="badge badge-success font-13">Đã chấp nhận</span>
                <span class="badge badge-danger font-13">Đã từ chối</span>
                <span class="badge badge-warning font-13">Chờ xác nhận</span>
              </p>
            </div> */}
          </div>
          <div class="inbox-widget">
            <div class="inbox-item">
              <p class="inbox-item-text">Không có tạm ứng lương nào.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <div class="text-center">
          <div class="row">
            <div class="col-md-6 col-xl-4">
              <div class="card-box card-normal bg-primary widget-flat border-primary text-white">
                <i class="fi-stack-2"></i>
                <h3 class="m-b-10">{userIndex.totalProjects}</h3>
                <p class="text-uppercase m-b-5 font-13 font-600">
                  Dự án đã và đang làm
                </p>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div class="card-box card-normal widget-flat border-success bg-success text-white">
                <i class="fi-sun"></i>
                <h3 class="m-b-10">{userIndex.dayOffInYear}</h3>
                <p class="text-uppercase m-b-5 font-13 font-600">
                  Số ngày đã nghỉ
                </p>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <div class="card-box card-normal bg-danger widget-flat border-danger text-white">
                <i class="fi-sun"></i>
                <h3 class="m-b-10">{userIndex.totalDayOffInYear}</h3>
                <p class="text-uppercase font-13 font-600">
                  Số ngày nghỉ còn lại
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="card-box">
          <div class="card-title font-500 font-18"> Dự án đang tham gia </div>
        </div>

        <div class="row">
          <div class="col-xs-6 col-md-6">
            <div class="card-box ribbon-box">
              <div class="ribbon ribbon-custom">Danh sách tăng ca</div>
              <div class="clearfix"></div>
              <div class="inbox-widget">
                <div class="inbox-item">
                  <p class="inbox-item-text">
                    Bạn chưa tăng ca trong tháng này.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-md-6">
            <div class="card-box ribbon-box">
              <div class="ribbon ribbon-danger">Danh sách xin nghỉ phép</div>
              <div class="clearfix"></div>
              <div class="inbox-widget">
                <div class="inbox-item">
                  <p class="inbox-item-text">
                    Không có nhân viên nào xin nghỉ phép.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
