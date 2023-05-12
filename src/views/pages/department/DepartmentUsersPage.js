import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoImage from "../../../assets/images/no-image.jpg";
import { Input, Cascader, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import DepartmentService from "../../../services/DepartmentService";
import Utils from "../../../common/utils/Utils";

export default function DepartmentUsersPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.AuthReducer.user;
  });

  const [enableEditEmployees, setEnableEditEmployees] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [employees, setEmployees] = useState([]);
  const projectLogo = "";

  const isAdmin = useSelector((state) => {
    return state.AuthReducer.isAdmin;
  });

  const handleAddTicketUser = (userId) => {
    navigate("/department/" + params.departmentId + "/user/" + userId);
  };

  useEffect(() => {
    getDepartmentUsers();
  }, []);

  const getDepartmentUsers = () => {
    DepartmentService.getDepartmentEmployees(
      params.departmentId,
      user.token
    ).then((res) => {
      console.log(res);
      const response = res.data;

      if (response.payload != null) {
        var users = response.payload.map((item) => {
          return {
            id: item.id,
            employeeCode: "#" + item.id,
            name: item.fullName,
            role: Utils.getDepartmentRoleString(item.departmentRole),
            status: "Trực tuyến",
          };
        });
        setEmployees(users);
      }
    });
  };

  const handleAddUserClick = () => {
    navigate("/department/" + params.departmentId + "/add-users/");
  };

  const projectStatusModels = ["Active"];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

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
        <div className="opt-button">
          <button
            title="Giao công việc"
            class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-success"
            type="button"
            onClick={() => handleAddTicketUser(id)}
          >
            <i class="mdi mdi-note-text menu-icon"></i>
          </button>

          <button
            title="Xóa nhân viên"
            class="remove-dayoff-bt btn btn-icon btn-sm waves-effect waves-light btn-danger"
            type="button"
          >
            <i class="mdi mdi-delete-circle"></i>
          </button>
        </div>
      ),
    },
  ];

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
                            disabled={!isAdmin}
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
                </div>

                <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Tên phòng ban</label>
                    <div class="col-sm-12">
                      <Input class="app-text" size="large" name=""></Input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Chủ sở hữu</label>
                    <div class="col-sm-12">
                      <Input class="app-text" size="large" name=""></Input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Trạng thái</label>
                    <div class="col-sm-12">
                      <Cascader
                        size="large"
                        name="projectStatusModels"
                        style={{
                          width: "100%",
                        }}
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
                    disabled={!isAdmin}
                    name="jobDescription"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div class="row">
                <div className="col-12">
                  <button
                    type="button"
                    class="btn btn-custom btn-rounded w-md waves-effect waves-light mb-4 float-right"
                    onClick={handleAddUserClick}
                  >
                    <i class="mdi mdi-plus-circle"></i> Thêm nhân viên
                  </button>
                </div>
              </div>
              <Table
                size="large"
                rowSelection={enableEditEmployees ? rowSelection : null}
                columns={columns}
                dataSource={employees}
              ></Table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
