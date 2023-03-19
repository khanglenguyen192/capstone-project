import React, { useState } from "react";
import NoImage from "../../../../assets/images/no-image.jpg";
import { Input, Cascader, Table, Tag } from "antd";

export default function AddProjectPage(props) {
  const [isAdmin, setAdmin] = useState(true);
  const [enableEditEmployees, setEnableEditEmployees] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const projectLogo = "";

  const projectStatusModels = [];

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
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{ text }</a>,
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
          <Tag color={ color } key={ status }>
            { status }
          </Tag>
        );
      },
    },
  ];

  //TODO hardcode data
  const employees = [
    {
      key: 1,
      employeeId: "#1",
      name: "Nguyễn Văn A",
      role: "Leader",
      age: 32,
      address: "06 Lý Thương Kiệt, Quận 10",
      status: "Trực tuyến",
    },
  ];

  for (let i = 2; i <= 50; i++) {
    employees.push({
      key: i,
      employeeId: `#${i}`,
      name: `Nguyễn Văn A ${i}`,
      role: "Member",
      age: 32,
      address: "06 Lý Thương Kiệt, Quận 10",
      status: "Trực tuyến",
    });
  }

  return (
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <form onSubmit="addProject" autocomplete="on">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                  <div class="form-group row d-flex justify-content-center align-items-center">
                    <div class="thumb-xxl member-thumb m-b-10">
                      { projectLogo ? (
                        <img
                          src={ NoImage }
                          class="img-cover rounded-circle img-thumbnail no-border"
                        ></img>
                      ) : (
                        <img
                          src={ NoImage }
                          class="img-cover rounded-circle img-thumbnail no-border"
                        ></img>
                      ) }
                    </div>
                  </div>

                  <div class="form-group row d-flex justify-content-center align-items-center">
                    <div class="vertical-center">
                      <input
                        type="file"
                        class="img-cover file-upload-default"
                        onChange="onChangeLogo($event)"
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
                            disabled={ !isAdmin }
                            style={ { width: '5rem', borderTopRightRadius: '6px', borderBottomRightRadius: '6px', cursor: 'pointer' } }
                            type="button"
                            onClick="logoImageUpload.click()">
                            Tải Lên
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-xs-6 col-lg-6 col-sm-6">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Tên dự án</label>
                    <div class="col-sm-12">
                      <Input class="app-text" size="large" name=""></Input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">
                      Tên khách hàng
                    </label>
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
                        style={ {
                          width: "100%",
                        } }
                        options={ projectStatusModels }
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
                    disabled={ isAdmin }
                    name="jobDescription"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <Table
                size="large"
                rowSelection={ enableEditEmployees ? rowSelection : null }
                columns={ columns }
                dataSource={ employees }
              ></Table>
              <br />
              <div class="form-group text-right m-b-0">
                <button class="btn btn-custom submit-btn waves-effect waves-light mr-2"
                  style={ { right: '8rem', bottom: '1.5rem' } }>
                  Hoàn tất
                </button>
                <button class="btn btn-icon waves-effect waves-light btn-danger"
                  style={ { right: '2rem', bottom: '1.5rem' } }>
                  Hủy bỏ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
