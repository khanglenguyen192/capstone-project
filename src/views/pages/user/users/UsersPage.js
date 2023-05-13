import React from "react";
import { Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";

export default function UsersPage(props) {
  const employeesInformation = {};

  const isAdmin = useSelector((state) => {
    console.log(state.AuthReducer);
    return state.AuthReducer.isAdmin;
  });

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = status.length % 2 == 0 ? "green" : "red";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
  ];

  const employees = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      age: 32,
      address: "06 Lý Thương Kiệt, Quận 10",
      status: "Trực tuyến",
    },
    {
      key: "2",
      name: "Lê Văn B",
      age: 42,
      address: "01 Võ Văn Ngân, Thủ Đức",
      status: "Nghỉ phép",
    },
  ];

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            {isAdmin ? (
              <h4 class="card-title">Nhân viên</h4>
            ) : (
              <h4 class="card-title">Đồng nghiệp</h4>
            )}

            <div class="text-center mt-4 mb-4">
              <div class="row">
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal widget-flat border-custom bg-custom text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">{employeesInformation.totalEmployee}</h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Tổng Số Nhân Viên
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal bg-primary widget-flat border-primary text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">
                      {employeesInformation.employeeOffInDay}
                    </h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Số Nhân Viên Nghỉ Trong Ngày
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal widget-flat border-success bg-success text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">
                      {employeesInformation.employeeOffInWeek}
                    </h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Số Nhân Viên Nghỉ Trong Tuần
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card-box card-normal bg-danger widget-flat border-danger text-white">
                    <i class="fi-head"></i>
                    <h3 class="m-b-10">
                      {employeesInformation.employeeOffInMonth}
                    </h3>
                    <p class="text-uppercase m-b-5 font-13 font-600">
                      Số Nhân Viên Nghỉ Trong Tháng
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="head-action">
              <button
                type="button"
                class="btn btn-custom btn-fw ml-2 float-right"
                onclick="exportSalaryBank()"
              >
                <i class="mdi mdi-bank"></i>Xuất Bank
              </button>

              <button
                routerLink="/add-user"
                type="button"
                class="btn btn-success btn-fw ml-2 float-right"
              >
                <i class="mdi mdi-account-plus"></i>Tạo Mới
              </button>

              <div class="btn-group dropdown ml-2 float-right">
                <a
                  href="javascript: void(0);"
                  class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-md"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="mdi mdi-settings"></i>Tác Vụ
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" onclick="exportSalaries()">
                    <i class="mdi mdi-file-document"></i> Xuất bảng lương
                  </a>
                  <a class="dropdown-item" onclick="lockEmployees()">
                    <i class="mdi mdi-lock-outline"></i> Tạm khóa
                  </a>
                  <a class="dropdown-item" onclick="removeEmployees()">
                    <i class="mdi mdi-account-remove"></i> Xóa nhân viên
                  </a>
                  <a class="dropdown-item" onclick="sendMessages()">
                    <i class="mdi mdi-message-draw"></i> Gửi thông báo
                  </a>
                </div>
              </div>
            </div>

            <Table columns={columns} dataSource={employees}></Table>
          </div>
        </div>
      </div>
    </div>
  );
}
