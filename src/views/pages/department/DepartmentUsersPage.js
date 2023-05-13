import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoImage from "../../../assets/images/no-image.jpg";
import { Input, Cascader, Table, Tag, Menu, Dropdown, message } from "antd";
import { useSelector } from "react-redux";
import DepartmentService from "../../../services/DepartmentService";
import Utils from "../../../common/utils/Utils";

export default function DepartmentUsersPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  useEffect(() => {
    if (user.userId == 1) {
      setIsAdmin(true);
    }

    getDepartmentUsers();
    getDepartment();
  }, []);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [ownerName, setOwnerName] = useState("Lê Nguyên Khang");

  const handleAddTicketUser = (userId) => {
    navigate("/department/" + params.departmentId + "/user/" + userId);
  };

  const getDepartmentUsers = () => {
    DepartmentService.getDepartmentEmployees(
      params.departmentId,
      user.token
    ).then((res) => {
      const response = res.data;

      if (response.payload != null) {
        var users = response.payload.map((item) => {
          if (
            item.id == user.userId &&
            (item.departmentRole == 1 || item.departmentRole == 2)
          ) {
            setIsAdmin(true);
          }

          var model = {
            id: item.id,
            employeeCode: "#" + item.id,
            name: item.fullName,
            role: Utils.getDepartmentRoleString(item.departmentRole),
            status: "Trực tuyến",
            email: item.email,
          };

          return model;
        });

        console.log(users);
        setEmployees(users);
      }
    });
  };

  const getDepartment = () => {
    DepartmentService.getDepartment(params.departmentId, user.token).then(
      (res) => {
        var response = res.data;
        if (
          response != null &&
          response != undefined &&
          response.status == 200
        ) {
          var department = response.payload;
          setDepartmentName(department.departmentName);
          setDepartmentDescription(department.description);
        }
      }
    );
  };

  const handleAddUserClick = () => {
    navigate("/department/" + params.departmentId + "/add-users/");
  };

  const handleViewTicketsClick = () => {
    navigate("/department/" + params.departmentId + "/tickets/");
  };

  const projectStatusModels = ["Active"];

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "employeeCode",
      key: "employeeCode",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vị trí",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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

  const adminColumns = [
    {
      title: "Mã nhân viên",
      dataIndex: "employeeCode",
      key: "employeeCode",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vị trí",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
    {
      title: "Tác vụ",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Dropdown
          trigger={["click"]}
          overlay={itemMenu}
          onClick={() => {
            console.log(id);
            setSelectedEmployeeId(id);
            console.log(selectedEmployeeId);
          }}
        >
          <div class="btn-group dropdown">
            <div class="table-action-btn dropdown-toggle arrow-none btn btn-light btn-sm">
              <i class="mdi mdi-dots-horizontal"></i>
            </div>
          </div>
        </Dropdown>
      ),
    },
  ];

  const onItemMenuClick = ({ key }) => {
    switch (key) {
      case "add-ticket":
        handleAddTicketUser(selectedEmployeeId);
        break;
      case "add-permission":
        if (user.userId != 1) {
          return;
        }
        var body = {
          departmentId: params.departmentId,
          userId: parseInt(selectedEmployeeId),
          roleId: 2,
        };
        DepartmentService.updateUser(body, user.token)
          .then((res) => {
            var response = res.data;
            if (response == null || response == undefined) {
              message.error("Có lỗi xảy ra, vui lòng thử lại!!!");
              return;
            }

            if (response.status == 200) {
              message.info("Cập nhật thành công");
              getDepartmentUsers();
            } else {
              message.error("Lỗi: " + response.error.message);
            }
          })
          .catch((res) => {
            message.error("Có lỗi xảy ra, vui lòng thử lại!!!");
          });
        break;
      case "remove":
        if (user.userId != 1) {
          return;
        }
        var body = {
          departmentId: params.departmentId,
          userId: parseInt(selectedEmployeeId),
          roleId: 2,
        };
        DepartmentService.removeUser(body, user.token)
          .then((res) => {
            var response = res.data;
            if (response == null || response == undefined) {
              message.error("Có lỗi xảy ra, vui lòng thử lại!!!");
              return;
            }

            if (response.status == 200) {
              message.info("Xóa thành công");
              getDepartmentUsers();
            } else {
              message.error("Lỗi: " + response.error.message);
            }
          })
          .catch((res) => {
            message.error("Có lỗi xảy ra, vui lòng thử lại!!!");
          });
        break;
    }
  };

  const itemMenu = (
    <Menu onClick={onItemMenuClick}>
      <Menu.Item key="add-ticket">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class=" mdi mdi-note-text menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Công việc
        </div>
      </Menu.Item>
      <Menu.Item key="view-request">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class=" mdi mdi-calendar-today menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Yêu cầu
        </div>
      </Menu.Item>
      {user.userId == 1 && (
        <Menu.Item key="add-permission">
          <div class="dropdown-item" id="ticket-menu-id-1">
            <i class="mdi mdi-account-key menu-icon mr-2 text-muted font-18 vertical-middle"></i>
            Cấp quyền
          </div>
        </Menu.Item>
      )}
      <Menu.Item key="remove">
        <div class="dropdown-item" id="ticket-menu-id-1">
          <i class=" mdi mdi-close-circle-outline menu-icon mr-2 text-muted font-18 vertical-middle"></i>
          Xóa
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <form>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                  <div class="form-group row d-flex justify-content-center align-items-center">
                    <div class="thumb-xxl member-thumb m-b-10">
                      <img
                        src={NoImage}
                        class="img-cover rounded-circle img-thumbnail no-border"
                      ></img>
                    </div>
                  </div>

                  {isAdmin && (
                    <div class="form-group row d-flex justify-content-center align-items-center">
                      <div class="vertical-center">
                        <input
                          type="file"
                          class="img-cover file-upload-default"
                          name="uploadedFile"
                          hidden
                        ></input>
                        <div class="input-group">
                          <input
                            type="text"
                            name="logoImageName"
                            class="form-control file-upload-info img-cover"
                            disabled
                            placeholder="Tải ảnh lên"
                          ></input>
                          <span class="input-group-append">
                            <button
                              class="btn-info disabled"
                              style={{
                                width: "5rem",
                                borderTopRightRadius: "6px",
                                borderBottomRightRadius: "6px",
                                cursor: "pointer",
                              }}
                              type="button"
                            >
                              Tải Lên
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Tên phòng ban</label>
                    <div class="col-sm-12">
                      <Input
                        class="app-text"
                        size="large"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        disabled={!isEdit}
                      ></Input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Chủ sở hữu</label>
                    <div class="col-sm-12">
                      <Input
                        class="app-text"
                        size="large"
                        name=""
                        value={ownerName}
                        disabled
                      ></Input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Trạng thái</label>
                    <div class="col-sm-12">
                      <Cascader
                        size="large"
                        disabled={!isEdit}
                        style={{
                          width: "100%",
                        }}
                        value={"Đang hoạt động"}
                        options={projectStatusModels}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label for="descripton">Mô tả</label>
                  <textarea
                    class="form-group col-md-12 textArea"
                    name="jobDescription"
                    rows="3"
                    value={departmentDescription}
                    onChange={(e) => setDepartmentDescription(e.target.value)}
                    disabled={!isEdit}
                  ></textarea>
                </div>
              </div>

              {isAdmin && (
                <div class="row">
                  <div className="col-12">
                    <div class="head-action">
                      <button
                        class=" arrow-none btn btn-light btn-md ml-2 float-right"
                        type="button"
                      >
                        <i class="mdi mdi-calendar-today"></i>Yêu cầu
                      </button>

                      <button
                        type="button"
                        class="btn btn-custom btn-fw ml-2 float-right"
                        onClick={handleViewTicketsClick}
                      >
                        <i class="mdi mdi-note-text menu-icon"></i>Công việc
                      </button>

                      <button
                        type="button"
                        class="btn btn-success btn-fw ml-2 float-right"
                        onClick={handleAddUserClick}
                      >
                        <i class="mdi mdi-account-plus"></i> Thêm mới
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div class="row">
                <br />
              </div>

              <Table
                size="large"
                columns={isAdmin ? adminColumns : columns}
                dataSource={employees}
              ></Table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
