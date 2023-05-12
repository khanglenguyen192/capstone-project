import React, { useEffect, useState } from "react";
import { Table, Tag, Dropdown, Menu, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentService from "../../../services/DepartmentService";

export default function AddDepartmentUserPage(props) {
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const navigate = useNavigate();
  const params = useParams();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (params.departmentId === undefined || params.departmentId === null) {
      return;
    }

    DepartmentService.getUsersToAdd(params.departmentId, user.token).then(
      (res) => {
        var response = res.data;
        if (response != null && response.payload != null) {
          var users = response.payload.map((item) => {
            return {
              key: item.id,
              id: item.id,
              userCode: "#" + item.userCode,
              name: item.fullName,
              gender: item.gender,
              email: item.email,
            };
          });

          setEmployees(users);
        }
      }
    );
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedUsers(newSelectedRowKeys);
  };

  const onAddUserClick = () => {
    if (selectedUsers == null || selectedUsers.length == 0) {
      message.warning("Vui lòng chọn nhân viên", 1);
      return;
    }

    var userModels = [...selectedUsers].map((userId) => {
      return {
        id: userId,
        roleId: 3,
      };
    });

    var body = {
      departmentId: params.departmentId,
      users: userModels,
    };

    DepartmentService.addUsersToDepartment(body, user.token).then((res) => {
      var response = res.data;
      if (response != null && response.status == 200) {
        message.info("Thêm thành công");
        navigate("/department-users/" + params.departmentId);
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại!!!");
      }
    });
  };

  const onCancelClick = () => {
    navigate("/department-users/" + params.departmentId);
  };

  const rowSelection = {
    selectedUsers,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "userCode",
      key: "userCode",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => {
        switch (gender) {
          case 1:
            return <div>Nam</div>;
          case 2:
            return <div>Nữ</div>;
          case 3:
            return <div>Khác</div>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <div>{email}</div>,
    },
  ];

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Thêm nhân viên</h4>

            <div className="row">
              <div className="col-sm-12">
                <div
                  id="datatable_filter"
                  className="dataTables_filter"
                  style={{ textAlign: "left" }}
                >
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Tìm
                    <input
                      style={{ marginLeft: "10px" }}
                      type="search"
                      className="form-control form-control-sm"
                    />
                  </label>
                </div>
              </div>
            </div>

            <Table
              columns={columns}
              rowSelection={rowSelection}
              dataSource={employees}
            ></Table>
          </div>

          <div class="form-group text-right m-b-0">
            <button
              class="btn btn-custom submit-btn waves-effect waves-light mr-2"
              onClick={onAddUserClick}
            >
              Xác Nhận
            </button>
            <button
              class="btn btn-icon waves-effect waves-light btn-danger"
              onClick={onCancelClick}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
